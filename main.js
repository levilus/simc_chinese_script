// ==UserScript==
// @name         raidbots翻译
// @namespace    http://tampermonkey.net/
// @version      2024-10-14
// @description  try to take over the world!
// @author       You
// @match        https://www.raidbots.com/simbot*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=freeuse.top
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 自定义翻译词典
    const translationDictionary = {
        'Top Gear':'最佳装备',
        'Find the best gear and talents for your character':'为你的角色寻找最佳装备和天赋',
        'Quick Sim':'快速模拟',
        'Run a quick sim to get your DPS and detailed stats': '快速模拟以获取你的DPS和详细属性',
        'Droptimizer':'掉落优化器',
        'Find your best drops':'寻找你最优的掉落',
        'Advanced':'高级',
        'Run (almost) any raw SimulationCraft script':'运行（几乎）任何原始的SimulationCraft脚本',
        'More':'更多',
        'Gear':'装备',
        'Stats':'属性',
        'Load from Armory':'从战网导入',
        'Load from SimC Addon':'从SimC插件导入',
        'Copy/paste the text from the SimulationCraft addon.':'复制/粘贴来自SimulationCraft插件的文本',
        'Input was not copied directly from the SimC addon. Raidbots tools are not guaranteed to work as expected.':'输入内容并非直接复制自SimC插件，Raidbots工具可能无法正常工作',
        'Load your character from the Armory or SimC addon above':'从上方的战网或SimC插件导入你的角色数据',
        'Run Droptimizer': '运行掉落优化器',
        'Find Top Gear': '寻找最佳装备',
        'High Precision (2x more precise, 4x slower)':'高精度（精确度提高2倍，速度降低4倍）',
        'Top Gear makes it easy to select multiple pieces of gear and automatically try all combinations of them to find the best for your character.':'最佳装备功能让你轻松选择多件装备，并自动尝试所有组合，帮助你找到最适合你角色的最佳搭配。',
        'Run Quick Sim':'运行快速模拟',
        'Run Simulation':'运行模拟',
        'Run (almost) any SimulationCraft script you want. Time limits still apply.':'运行你想要的（几乎）任何SimulationCraft脚本，但仍受时间限制',
        'Iterations, fight style, and fight length specified in your input will take priority over the advanced options below': '输入中指定的迭代次数、战斗风格和战斗时长将优先于下方的高级选项',
        'Simulation Options:':'模拟选项',
        'Fight Style':'战斗风格',
        'Patchwerk':'木桩战',
        'No movement, single target':'无移动，单目标',
        'Dungeon Slice':'地下城切片',
        '6 minute slice of an M+ dungeon.  Overrides Fight Length. Check with your class Discord to see if appropriate for your spec.':'6分钟的M+地下城切片。覆盖战斗时长设置。请查看你的职业Discord，确认该选项是否适合你的专精',
        'Embellishments': '美化',
        'Dawn/Duskthread Lining Uptime': '晖晨/萤暮内衬激活时间',
        'Target Dummy':'训练假人',
        'Always 100% health, raid buffs/debuffs disabled, no consumables':'始终100%生命值，团队增益/减益禁用，无消耗品',
        'Execute Patchwerk':'斩杀木桩战',
        'Target starts at 20% HP':'目标从20%生命值开始',
        'Hectic Add Cleave':'混乱的多目标分裂打击(add)',
        'Regular add spawns (5 adds up about 40% of the fight), frequent movement. Similar to T15 Horridon':'定期刷新小怪（战斗中约40%的时间有5个小怪同时出现），频繁移动。类似T15的哈里登战斗',
        'Light Movement':'低频移动战',
        'Infrequent movement - Move 50 yards every 85 seconds':'不频繁移动——每85秒移动50码',
        'Heavy Movement':'高频移动战',
        'Frequent movement - Move 25 yards every 10 seconds':'频繁移动——每10秒移动25码',
        'Casting Patchwerk':'施法木桩战',
        'Patchwerk that is always casting, can be useful for simming interrupts':'始终在施法的木桩战，可用于模拟打断',
        'Cleave Add':'分裂打击小怪add',
        'Single add is up about 60% of the fight':'战斗中约60%的时间会有一个小怪add',
        'Number of Bosses':'首领数量',
        'Default and best for single target sims':'默认选项，并且最适合单目标模拟',
        'Fight Style overrides to 1 Boss':'战斗风格设置为1个首领',
        '2 Bosses':'2个首领',
        '3 Bosses':'3个首领',
        '4 Bosses':'4个首领',
        '5 Bosses':'5个首领',
        '6 Bosses':'6个首领',
        '7 Bosses':'7个首领',
        '8 Bosses':'8个首领',
        '9 Bosses':'9个首领',
        '10 Bosses':'10个首领',
        'Two stacked bosses up at all times, good for multitarget sims':'两个首领始终重叠在一起，适合多目标模拟',
        'Three stacked bosses up at all times, good for multitarget sims':'三个首领始终重叠在一起，适合多目标模拟',
        'Fight Length':'战斗时长',
        'SimC Version':'SimC版本',
        'Weekly':'周更',
        'Nightly':'每晚',
        'Latest':'最新',
        'Built from source every Monday':'每周一从源代码构建',
        'Nightly build from source, most up-to-date but low chance of bugs':'每晚从源代码构建，最为最新但有较低几率出现漏洞',
        'The latest build from SimC. Can change rapidly. Higher chance of bugs.Keep an eye on the git hash to avoid confusion.':'SimC的最新构建版本，可能会快速变化，出现漏洞的几率较高。请关注git哈希值以避免混淆。',
        'Show More Options':'显示更多选项',
        'Restore Default Options':'恢复默认选项',
        'Raid Buff Presets':'团队增益预设',
        'Optimal Raid Buffs':'最佳团队增益',
        'No Buffs':'无增益',
        'Consumables':'消耗品',
        '"SimC Default" uses the default consumables defined in the class APL/module. To verify, you can run a Quick Sim and check buffs to see what was used.':'“SimC Default” 使用的是在职业APL（行动优先级列表）或模块中定义的默认消耗品。要验证这一点，你可以运行一次快速模拟，检查增益效果，查看使用了哪些消耗品。',
        'Potion':'药水',
        'Food':'食物',
        'Flask':'合剂',
        'Augmentation':'增强物',
        'Weapon Rune':'武器符文',
        'No Potion':'无药水',
        'Tempered Potion (Quality 3)':'淬火药水(3星)',
        'Tempered Potion (Quality 2)':'淬火药水(2星)',
        'Tempered Potion (Quality 1)':'淬火药水(1星)',
        'Potion of Unwavering Focus (Quality 3)':'专心致志药水(3星)',
        'Potion of Unwavering Focus (Quality 2)':'专心致志药水(2星)',
        'Potion of Unwavering Focus (Quality 1)':'专心致志药水(1星)',
        'Elemental Potion of Ultimate Power (Quality 3)':'元素究极强能药水(3星)',
        'Elemental Potion of Ultimate Power (Quality 2)':'元素究极强能药水(2星)',
        'Elemental Potion of Ultimate Power (Quality 1)':'元素究极强能药水(1星)',
        'Elemental Potion of Power (Quality 3)':'元素强能药水(3星)',
        'Elemental Potion of Power (Quality 2)':'元素强能药水(2星)',
        'Elemental Potion of Power (Quality 1)':'元素强能药水(1星)',
        'Bottled Putrescence (Quality 3)':'瓶装溃烂(3星)',
        'Bottled Putrescence (Quality 2)':'瓶装溃烂(2星)',
        'Bottled Putrescence (Quality 1)':'瓶装溃烂(1星)',
        'Potion of Chilled Clarity (Quality 3)':'伤寒清醒药水(3星)',
        'Potion of Chilled Clarity (Quality 2)':'伤寒清醒药水(2星)',
        'Potion of Chilled Clarity (Quality 1)':'伤寒清醒药水(1星)',
        'Potion of Shocking Disclosure (Quality 3)':'震击揭示药水(3星)',
        'Potion of Shocking Disclosure (Quality 2)':'震击揭示药水(2星)',
        'Potion of Shocking Disclosure (Quality 1)':'震击揭示药水(1星)',
        'No Food':'无食物',
        //'Feast of the Midnight Masquerade (445 Primary Stat)':''
        'Raid Buffs':'团队增益',
        'If your character provides one of these buffs, it may be used even if disabled here':'如果你的角色提供其中一种增益效果，即使在此处禁用，它仍可能被使用',
        'Bloodlust':'嗜血',
        'Arcane Intellect':'奥术智慧',
        'Power Word: Fortitude':'真言术：韧',
        'Mark of the Wild':'野性印记',
        'Battle Shout':'战斗怒吼',
        'Mystic Touch (5% Physical Damage)':'物理易伤(5%物理伤害加成)(武僧)',
        'Chaos Brand (3% Magic Damage)':'混乱烙印 (3%魔法伤害加成)(dh)',
        'Skyfury':'天怒',
        'Hunter\'s Mark':'猎人印记',
        'Power Infusion (Beta)':'能量灌注（测试版）',
        'Bleeding':'流血',
        'Misc Options':'杂项选项',
        'Detailed SimC Report':'详细的SimC报告',
        'Show Fewer Options':'显示更少选项',
    }
    // 转义正则表达式中特殊字符的函数
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义正则中的特殊字符
    }
    // 翻译文本函数：根据自定义词典替换文本
    function translateText(text) {
        let translatedText = text;
        for (const [original, translated] of Object.entries(translationDictionary)) {
            if(translatedText == original) {
                console.log('translated: ' + text)
                translatedText = translated;
                break;
            }
        }
        return translatedText
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
