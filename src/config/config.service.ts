import { Injectable } from "@nestjs/common";
import * as fs from "fs-extra";
import * as yaml from "js-yaml";

const CONFIG_FILE_PATH = "./config.yml";

@Injectable()
export class ConfigService {
  constructor() {
    this.config = yaml.load(fs.readFileSync("./config.yml"));
    console.log(this.config);
  }
  config;
}
