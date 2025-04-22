import { unlinkSync } from "node:fs";

import localPath from "./localPath.js";
import json from "./json.js";

const get = () => {
    let hasCurrentConfig = json.hasFile('../data/current/config.json', { createFile: false });
    let config;

    if (!hasCurrentConfig.status){
        config = json.load('../data/default/config.json');
    } else {
        config = json.load('../data/current/config.json');
    };

    return config;
};

const update = (data) => {
    try {
        let defaultConfig = get();
        return json.update('../data/current/config.json', { ...defaultConfig, ...data }, { rewrite: true, new: true });
    } catch (error){
        return { status: false };
    } finally {
        return { status: true };
    };
};

const reset = () => {
    try {
        let hasCurrentConfig = json.hasFile('../data/current/config.json', { createFile: false });
        if (hasCurrentConfig.status){
            const currentConfigPath = localPath.absolutePath('../data/current/config.json');
            unlinkSync(currentConfigPath);       
        };
    } catch (error){
        return { status: false };
    } finally {
        return { status: true };
    };
};

export default {
    get, update, reset
};