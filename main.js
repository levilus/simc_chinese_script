// ==UserScript==
// @name         raidbots翻译
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.raidbots.com/simbot*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=freeuse.top
// @updateURL    https://raw.githubusercontent.com/levilus/simc_chinese_script/refs/heads/main/main.js
// @downloadURL  https://raw.githubusercontent.com/levilus/simc_chinese_script/refs/heads/main/main.js
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';
    // 自定义翻译词典
    let translationDictionary = {}
    GM.xmlHttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/levilus/simc_chinese_script/refs/heads/main/trans.json",// 远程 JSON 文件的 URL
        onload: function(response) {
            if (response.status === 200) {
                try {
                    // 解析 JSON 数据
                    translationDictionary = JSON.parse(response.responseText);
                    console.log('Fetched and parsed JSON data:', translationDictionary);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Failed to fetch JSON, status:', response.status);
            }
        },
        onerror: function(error) {
            console.error('Request error:', error);
        }
    });
    // 翻译文本函数：根据自定义词典替换文本
    function translateLine(text) {
        let translatedText = text.trim()
        for (const [original, translated] of Object.entries(translationDictionary)) {
            if(translatedText.toLowerCase() == original) {
                console.log('translated: ' + text)
                translatedText = translated;
                break;
            }
        }
        return translatedText
    }
    // 翻译文本函数：根据自定义词典替换文本
    function translateText(text) {
        let translatedText = text;
        let texts = translatedText.split(/\r\n|\n/)
        if(texts.length > 1) {
            let newText = []
            texts.forEach(function(str){
                str = translateLine(str)
                newText.push(str)
            })
            return newText.join("\n")
        }else {
            return translateLine(text)
        }
    }
    var version = 1
    // 递归翻译元素及其子节点中的文本
    function translateNode(node) {
        // 检查当前节点是否为文本节点
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text) {
                const translatedText = translateText(text);
                if(translatedText != text){
                    node.nodeValue = translatedText;
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 遍历子节点进行递归翻译
            node.childNodes.forEach(childNode => translateNode(childNode));
        }
    }
    // 翻译网页内容的函数
    function translatePage(){
        console.log('page')
        const elements = document.querySelectorAll('span,h2,p,div'); // 获取网页中的文本元素
        elements.forEach(element => {
            translateNode(element) // 递归翻译元素和子节点
        });
    }
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                // 处理新增的节点
                mutation.addedNodes.forEach(node => {
                    //if (node.nodeType === Node.ELEMENT_NODE) {
                    //  const elements = node.querySelectorAll('*');
                    //elements.forEach(el => translateNode(el));
                    //   }
                    translateNode(node);
                });
            } else if (mutation.type === 'characterData') {
                // 处理文本内容变化
                const parentElement = mutation.target.parentElement;
                if (parentElement) {
                    translateNode(parentElement);
                }
            }
        })
    })
    const config = {childList:true, subtree:true, characterData:true}
    observer.observe(document.body, config)
    window.addEventListener('load', function(){
        console.log('trans loaded')
        translatePage()
    })
    //const s1 = document.getElementById('AdvancedSimOptions-fightStyle')
    //s1.addEventListener('change', function(event){
    //})
})();
