import { container } from "tsyringe";
import IStorageProvider from "./IStorageProvider";
import LocalStorageProvider from "./LocalStorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);