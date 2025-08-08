import { SetMetadata } from "@nestjs/common";

export const PUBLIC_KEY = "IsPublic";
export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
