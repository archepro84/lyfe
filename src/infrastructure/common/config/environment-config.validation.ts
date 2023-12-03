import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { InvalidEnvironmentVariableException } from '@infrastructure/common/config/exception/invalid-environment-variable.exception';

export enum EnvironmentStatus {
  Production = 'production',
  Development = 'development',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(EnvironmentStatus)
  NODE_ENV: EnvironmentStatus;

  @IsString()
  SERVICE_NAME: string;

  @IsString()
  AWS_SNS_REGION: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_REFRESH_SECRET_KEY: string;

  @IsNumber()
  JWT_REFRESH_EXPIRATION_TIME: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new InvalidEnvironmentVariableException(errors.toString());
  }
  return validatedConfig;
}
