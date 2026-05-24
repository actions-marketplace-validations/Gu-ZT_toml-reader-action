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
    fields.forEach((field) => {
        core.setOutput(field.replace('.', '-'), readField(parsedDoc, field));
    });
} catch (error) {
    core.setFailed(error.message);
}
