import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function MarkdownToHtml(){
    const fs = require('fs');

    /* try {
        const data = fs.readFileSync('../../README.md', 'utf8');
        console.log(data);
        return(
            <ReactMarkdown>{data}</ReactMarkdown>
        )
    } catch (err) {
        console.error(err);
    } */

    return(
        <ReactMarkdown>1. data</ReactMarkdown>
    )
}