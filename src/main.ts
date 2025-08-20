import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { join } from "node:path";
import { existsSync, mkdirSync } from "fs";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const uploadDir = join(process.cwd(), "uploads");
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir);
    }

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        })
    );
    const configService = app.get(ConfigService);
    const port = configService.get<number>("PORT", 8080);
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
