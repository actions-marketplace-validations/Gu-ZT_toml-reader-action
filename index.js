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
    const debug = core.getInput('debug') === 'true';
    const fields = core.getMultilineInput('fields');
    const doc = fs.readFileSync(file, {encoding: 'utf8'});
    const parsedDoc = parse(doc);
    const value = {};
    fields.forEach((field) => {
        value[field.replace('.', '-')] = readField(parsedDoc, field);
    });
    if (debug) {
        console.log('Parsed TOML document:', parsedDoc);
    }
    for (let key in value) {
        core.setOutput(key, value[key]);
        if (debug) {
            console.log(`Set output ${key} to ${value[key]}`);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
