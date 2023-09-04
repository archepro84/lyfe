resource "aws_security_group" "alb" {
  name   = "${var.service_name}-alb"
  vpc_id = aws_vpc.this.id

  ingress {
    description = "alb-http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "alb-https"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "alb-egress-all"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_alb" "this" {
  name               = "${var.service_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]

  timeouts {}

  tags = {
    Name = "${var.service_name}-alb"
  }
}

resource "aws_alb_target_group" "this" {
  name        = "${var.service_name}-tg"
  vpc_id      = aws_vpc.this.id
  target_type = "ip"
  port        = 80

  protocol         = "HTTP"
  protocol_version = "HTTP1"

  health_check {
    path                = "/api/ping"
    healthy_threshold   = 5 # default
    matcher             = "200" # default
    timeout             = 5 # default
    unhealthy_threshold = 2 # default
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.service_name}-tg"
  }
}

resource "aws_alb_listener" "this" {
  load_balancer_arn = aws_alb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.this.arn
  }
}