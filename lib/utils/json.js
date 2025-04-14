import { readFileSync, writeFileSync, existsSync } from 'node:fs';

import { absolutePath } from './localPath.js';

const hasFile = (path, options={ returnContent: false }) => {
    try {
        path = absolutePath(path);
        if (!existsSync(path)){
            writeFileSync(path, JSON.stringify({}, null, 2));
            return { status: false, content: {} };
        }
        if (!options.returnContent) return { status: true };
        const file = readFileSync(path, { encoding: 'utf-8' });
        const content = JSON.parse(file);
        return { 
            status: true,
            content
        }
        
    } catch (err) {
        console.log(err)
    }
}

const update = (path, content, options={ rewrite: false, new: false }) => {
    try {
        path = absolutePath(path);
        hasFile(path);
        const file = readFileSync(path, { encoding: 'utf-8' });
        const currentContent = JSON.parse(file);
        content = options.rewrite ? content : { ...currentContent, ...content };
        writeFileSync(path, JSON.stringify(content, null, 2));
        return options.new ? content : {};
    } catch (err) {
        console.log(err)
    }
}

const load = (path, options={ update: false }) => {
    try {
        hasFile(path)
        path = absolutePath(path);
        const file = readFileSync(path, { encoding: 'utf-8' });
        const content = JSON.parse(file);
        const updateLoadedContent = (content, options) => {
            return update(path, content, options);
        };
        return options.update ? { content, update: updateLoadedContent } : content;
    } catch (err){
        console.log(err)
    }

}

export default {
    hasFile,
    update,
    load,
}