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
    return {path, value};
}

try {
    const file = core.getInput('file');
    const fields = core.getMultilineInput('fields');
    const value = {};
    const doc = fs.readFileSync(file, {encoding: 'utf8'});
    const parsedDoc = parse(doc);
    fields.forEach((field) => {
        const {path, value: fieldValue} = readField(parsedDoc, field);
        let current = value;
        path.forEach((f, i) => {
            if (i === path.length - 1) {
                current[f] = fieldValue;
            } else {
                if (!current[f]) {
                    current[f] = {};
                }
                current = current[f];
            }
        });
    });
    core.setOutput('value', value);
} catch (error) {
    core.setFailed(error.message);
}