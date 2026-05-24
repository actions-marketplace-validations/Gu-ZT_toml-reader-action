import * as core from '@actions/core';
import {parse} from 'smol-toml';
import * as fs from 'fs';

function readField(parsedDoc, field) {
    const path = field.split('.');
    let value = parsedDoc;
    try {
        path.forEach((f) => {
            value = value[f];
        });
    } catch (_) {
        value = undefined;
    }
    return value;
}

try {
    const file = core.getInput('file');
    const fields = core.getMultilineInput('fields');
    const doc = fs.readFileSync(file, {encoding: 'utf8'});
    const parsedDoc = parse(doc);
    const value = {};
    fields.forEach((field) => {
        value[field.replace('.', '-')] = readField(parsedDoc, field);
    });
    for (let key in value) {
        core.setOutput(key, value[key]);
    }
} catch (error) {
    core.setFailed(error.message);
}
