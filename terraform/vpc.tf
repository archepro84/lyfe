locals {
  public_subnets = {
    "${var.region}a" = "10.84.0.0/20"
    "${var.region}c" = "10.84.16.0/20"
  }
  private_subnets = {
    "${var.region}a" = "10.84.128.0/20"
    "${var.region}c" = "10.84.144.0/20"
  }
}

resource "aws_vpc" "this" {
  cidr_block = "10.84.0.0/16"

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.service_name}-vpc"
  }
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = "${var.service_name}-igw"
  }
}

resource "aws_eip" "this" {
  vpc = true

  tags = {
    Name = "${var.service_name}-eip-nat"
  }
}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.this.id
  subnet_id     = aws_subnet.publics[
  element(sort(keys(local.public_subnets)), 0)
  ].id

  tags = {
    Name = "${var.service_name}-nat"
  }
}

resource "aws_subnet" "privates" {
  for_each = local.private_subnets

  vpc_id     = aws_vpc.this.id
  cidr_block = each.value

  availability_zone = each.key

  tags = {
    Name = "${var.service_name}-privates-${each.key}"
  }
}

resource "aws_subnet" "publics" {
  for_each = local.public_subnets

  vpc_id     = aws_vpc.this.id
  cidr_block = each.value

  map_public_ip_on_launch = true # Public IP 부여 여부
  availability_zone       = each.key

  tags = {
    Name = "${var.service_name}-publics-${each.key}"
  }
}

resource "aws_default_route_table" "public" {
  default_route_table_id = aws_vpc.this.default_route_table_id

  tags = {
    Name = "${var.service_name}-public"
  }
}

resource "aws_route" "public" {
  route_table_id         = aws_default_route_table.public.id
  destination_cidr_block = "0.0.0.0/0" # All Access to Internet
  gateway_id             = aws_internet_gateway.this.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = "${var.service_name}-private"
  }
}

resource "aws_route" "privates_nat_gateway" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0" # All Access to Nat Gateway
  nat_gateway_id         = aws_nat_gateway.this.id
}

# docs: https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/WorkWithRouteTables.html
resource "aws_route_table_association" "publics" {
  for_each = local.public_subnets

  subnet_id      = aws_subnet.publics[each.key].id
  route_table_id = aws_default_route_table.public.id
}

resource "aws_route_table_association" "private" {
  for_each = local.private_subnets

  subnet_id      = aws_subnet.privates[each.key].id
  route_table_id = aws_route_table.private.id
}
