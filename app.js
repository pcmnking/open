document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        follower.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    });

    // 2. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(s => observer.observe(s));

    setTimeout(() => document.querySelector('.hero-content').classList.add('active'), 100);

    // 3. Solar System SVG
    const solarVisual = document.getElementById('solarVisual');
    if (solarVisual) {
        solarVisual.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                <defs><radialGradient id="sunGradient"><stop offset="0%" stop-color="#fff7e6" /><stop offset="100%" stop-color="#ffa500" /></radialGradient></defs>
                <rect width="600" height="600" fill="#000" />
                <circle cx="300" cy="300" r="30" fill="url(#sunGradient)" />
                <circle cx="300" cy="300" r="60" fill="none" stroke="rgba(255,255,255,0.2)" />
                <circle cx="300" cy="300" r="100" fill="none" stroke="rgba(255,255,255,0.2)" />
                <circle cx="300" cy="300" r="150" fill="none" stroke="rgba(255,255,255,0.2)" />
                <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(255,255,255,0.2)" />
                <circle cx="300" cy="300" r="270" fill="none" stroke="rgba(255,255,255,0.2)" />
                <g><circle cx="360" cy="300" r="5" fill="#979797"><animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="4s" repeatCount="indefinite" /></circle><text x="365" y="295" fill="#fff" font-size="12">水</text></g>
                <g><circle cx="400" cy="300" r="8" fill="#e3bb76"><animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="7s" repeatCount="indefinite" /></circle><text x="408" y="295" fill="#fff" font-size="12">金</text></g>
                <g><circle cx="450" cy="300" r="7" fill="#e27b58"><animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="12s" repeatCount="indefinite" /></circle><text x="458" y="295" fill="#fff" font-size="12">火</text></g>
                <g><circle cx="510" cy="300" r="15" fill="#d39c7e"><animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="25s" repeatCount="indefinite" /></circle><text x="525" y="295" fill="#fff" font-size="12">木</text></g>
                <g><circle cx="570" cy="300" r="13" fill="#c5ab6e"><animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="45s" repeatCount="indefinite" /></circle><text x="585" y="295" fill="#fff" font-size="12">土</text></g>
            </svg>
        `;
    }

    // 4. Evolution Logic
    const steps = document.querySelectorAll('.step-btn');
    const evolutionVisual = document.getElementById('evolutionVisual');
    const evolutionText = document.getElementById('evolutionText');
    const evolutionTitle = evolutionText.querySelector('h3');
    const evolutionDesc = evolutionText.querySelector('p');

    const ninePalaceData = [
        { name: "巽", symbol: "☴" }, { name: "離", symbol: "☲" }, { name: "坤", symbol: "☷" },
        { name: "震", symbol: "☳" }, { name: "太極", symbol: "☯" }, { name: "兌", symbol: "☱" },
        { name: "艮", symbol: "☶" }, { name: "坎", symbol: "☵" }, { name: "乾", symbol: "☰" }
    ];

    const evolutionData = {
        1: { title: "太極 (Taiji)", desc: "萬物之始，陰陽平衡。", content: `<svg width="100%" height="250" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"><circle cx="100" cy="100" r="95" fill="white" stroke="#eee" /><path d="M100 5 A 47.5 47.5 0 0 1 100 100 A 47.5 47.5 0 0 0 100 195 A 95 95 0 0 0 100 5" fill="black" /><circle cx="100" cy="52.5" r="15" fill="white" /><circle cx="100" cy="147.5" r="15" fill="black" /><circle cx="100" cy="52.5" r="5" fill="black" /><circle cx="100" cy="147.5" r="5" fill="white" /></svg>` },
        2: { title: "兩儀 (Liangyi)", desc: "分陰陽，定動靜。", content: `<div style="font-size: clamp(80px, 20vw, 150px); color: #27ae60;">⚊ ⚋</div>` },
        3: { title: "四象 (Sixiang)", desc: "太陽、少陰、少陽、太陰。", content: `<div style="font-size: clamp(40px, 10vw, 80px); color: #27ae60; display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 20px; width: 100%; max-width: 600px;"><div>⚌<br><small style="font-size:16px">太陽</small></div><div>⚍<br><small style="font-size:16px">少陰</small></div><div>⚎<br><small style="font-size:16px">少陽</small></div><div>⚏<br><small style="font-size:16px">太陰</small></div></div>` },
        4: { title: "八卦九宮", desc: "方位與萬物的基本對應。", content: `<div class="nine-palace-grid">${ninePalaceData.map((item, i) => `<div class="palace-box ${i===4?'center-box':''}"> <span style="font-size: clamp(1.5rem, 5vw, 3rem); color:#27ae60">${item.symbol}</span> <span style="font-size: clamp(0.8rem, 3vw, 1.1rem); font-weight:bold">${item.name}</span> </div>`).join('')}</div>` },
        5: { title: "六十四卦", desc: "演化之終，窮盡變化。", content: `<div class="hex-64-container">${Array.from({length: 64}, (_, i) => `<div class="hex-box"><span class="hex-symbol">${String.fromCodePoint(0x4DC0 + i)}</span></div>`).join('')}</div>` }
    };

    steps.forEach(step => {
        step.addEventListener('click', () => {
            const id = step.getAttribute('data-step');
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            evolutionVisual.style.opacity = 0;
            setTimeout(() => {
                evolutionVisual.innerHTML = evolutionData[id].content;
                evolutionTitle.innerText = evolutionData[id].title;
                evolutionDesc.innerText = evolutionData[id].desc;
                evolutionVisual.style.opacity = 1;
            }, 300);
        });
    });

    // 5. Stems & Branches
    const stemsData = [
        { key: "甲", name: "甲木", element: "wood", desc: "陽木。正直、領導力、棟樑之才。" }, { key: "乙", name: "乙木", element: "wood", desc: "陰木。柔韌、靈活、藝術氣息。" },
        { key: "丙", name: "丙火", element: "fire", desc: "陽火。熱情、光明、積極主動。" }, { key: "丁", name: "丁火", element: "fire", desc: "陰火。溫馨、靈性、內斂奉獻。" },
        { key: "戊", name: "戊土", element: "earth", desc: "陽土。穩重、誠信、堅固可靠。" }, { key: "己", name: "己土", element: "earth", desc: "陰土。多才、包容、孕育萬物。" },
        { key: "庚", name: "庚金", element: "metal", desc: "陽金。剛毅、決斷、重情重義。" }, { key: "辛", name: "辛金", element: "metal", desc: "陰金. 價值、敏銳、細膩感性。" },
        { key: "壬", name: "壬水", element: "water", desc: "陽水. 廣大、智慧、流動多變。" }, { key: "癸", name: "癸水", element: "water", desc: "陰水. 靈動、純淨、思維縝密。" }
    ];
    const branchesData = [
        { key: "子", name: "子水", element: "water", desc: "智慧之源, 深沉靜謐。" }, { key: "丑", name: "丑土", element: "earth", desc: "能量轉化, 堅韌守成。" },
        { key: "寅", name: "寅木", element: "wood", desc: "蓬勃新生, 開拓力量。" }, { key: "卯", name: "卯木", element: "wood", desc: "生機盎然, 柔順繁衍。" },
        { key: "辰", name: "辰土", element: "earth", desc: "變革龍吟, 復甦擴張。" }, { key: "巳", name: "巳火", element: "fire", desc: "思想傳播, 充滿熱情。" },
        { key: "午", name: "午火", element: "fire", desc: "巔峰能量, 光明極盛。" }, { key: "未", name: "未土", element: "earth", desc: "能量過渡, 溫潤沉澱。" },
        { key: "申", name: "申金", element: "metal", desc: "規則建立, 收斂成熟。" }, { key: "酉", name: "酉金", element: "metal", desc: "價值展現, 精緻收成。" },
        { key: "戌", name: "戌土", element: "earth", desc: "收藏總結, 穩重守備。" }, { key: "亥", name: "亥水", element: "water", desc: "回歸母體, 修復滋養。" }
    ];

    document.getElementById('stemsList').innerHTML = stemsData.map(item => `<div class="detail-item ${item.element}"><div class="item-key">${item.key}</div><div class="item-val"><h4>${item.name}</h4><p>${item.desc}</p></div></div>`).join('');
    document.getElementById('branchesList').innerHTML = branchesData.map(item => `<div class="detail-item ${item.element}"><div class="item-key">${item.key}</div><div class="item-val"><h4>${item.name}</h4><p>${item.desc}</p></div></div>`).join('');

    // 6. Relationship Diagrams
    function createDetailedDiagram(containerId, nodes, colors) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const width = 450, height = 450, centerX = 225, centerY = 225, radius = 150;

        let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
            <defs>
                <marker id="arrow-sheng-${containerId}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#27ae60" /></marker>
                <marker id="arrow-ke-${containerId}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#e74c3c" /></marker>
            </defs>`;

        for (let i = 0; i < 5; i++) {
            const sA = (i * 72 - 90) * (Math.PI / 180), eA = ((i + 2) * 72 - 90) * (Math.PI / 180);
            const x1 = centerX + (radius-40)*Math.cos(sA), y1 = centerY + (radius-40)*Math.sin(sA), x2 = centerX + (radius-40)*Math.cos(eA), y2 = centerY + (radius-40)*Math.sin(eA);
            svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e74c3c" stroke-width="2" stroke-dasharray="8,4" marker-end="url(#arrow-ke-${containerId})" />`;
            const lx = (x1+x2)/2, ly = (y1+y2)/2;
            svg += `<text x="${lx}" y="${ly}" fill="#e74c3c" font-size="12" font-weight="bold" text-anchor="middle">剋</text>`;
        }
        for (let i = 0; i < 5; i++) {
            const sA = (i * 72 - 80) * (Math.PI / 180), eA = ((i + 1) * 72 - 100) * (Math.PI / 180);
            const x1 = centerX + radius*Math.cos(sA), y1 = centerY + radius*Math.sin(sA), x2 = centerX + radius*Math.cos(eA), y2 = centerY + radius*Math.sin(eA);
            svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}" stroke="#27ae60" fill="none" stroke-width="3" marker-end="url(#arrow-sheng-${containerId})" />`;
            const lA = (i * 72 - 54) * (Math.PI / 180), lx = centerX + (radius+25)*Math.cos(lA), ly = centerY + (radius+25)*Math.sin(lA);
            svg += `<text x="${lx}" y="${ly}" fill="#27ae60" font-size="12" font-weight="bold" text-anchor="middle">生</text>`;
        }
        nodes.forEach((label, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180), x = centerX + radius*Math.cos(angle), y = centerY + radius*Math.sin(angle);
            svg += `<circle cx="${x}" cy="${y}" r="45" fill="${colors[i]}" stroke="#fff" stroke-width="2" />`;
            const parts = label.split('、');
            if (parts.length > 1) {
                svg += `<text x="${x}" y="${y-5}" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${parts[0]}</text>`;
                svg += `<text x="${x}" y="${y+15}" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${parts[1]}</text>`;
            } else svg += `<text x="${x}" y="${y+8}" text-anchor="middle" fill="white" font-size="18" font-weight="bold">${label}</text>`;
        });
        svg += `</svg>`;
        container.innerHTML = svg;
    }

    createDetailedDiagram("wuxingDiagram", ["木", "火", "土", "金", "水"], ["#2ecc71", "#e74c3c", "#e67e22", "#f1c40f", "#3498db"]);
    createDetailedDiagram("tengodDiagram", ["比肩、劫財", "食神、傷官", "正財、偏財", "正官、七殺", "正印、偏印"], ["#2d3436", "#2d3436", "#2d3436", "#2d3436", "#2d3436"]);

    // 7. Ten Gods Meanings List
    const tengodMeaningsData = [
        { name: "比肩", desc: "自我、競爭、剛毅、獨立。代表自尊心強，與同輩關係密切。" },
        { name: "劫財", desc: "爭奪、外向、豪爽、財產流失。代表行動力強，但也容易財來財去。" },
        { name: "食神", desc: "才華、福氣、溫和、口才。代表享受生活、溫文爾雅與含蓄的創意。" },
        { name: "傷官", desc: "創意、偏激、挑戰權威、表現慾。代表聰明靈活，追求卓越與變革。" },
        { name: "正財", desc: "穩定收入、踏實、勤儉、責任感。代表辛勤勞動所得，重視安全感。" },
        { name: "偏財", desc: "意外之財、大方、交際、父親。代表橫財、投機與慷慨的性格。" },
        { name: "正官", desc: "法律、責任、名譽、上司。代表自律、守規矩與社會地位。" },
        { name: "七殺", desc: "權力、鬥志、壓力、危險。代表魄力、威嚴與在逆境中的生存力。" },
        { name: "正印", desc: "保護、學問、名聲、母親。代表慈愛、智慧與長輩的庇佑。" },
        { name: "偏印", desc: "孤僻、靈性、非正統學問。代表觀察力敏銳，具有獨特的見解與天賦。" }
    ];

    const tengodList = document.getElementById('tengodList');
    if (tengodList) {
        tengodList.innerHTML = tengodMeaningsData.map(item => `
            <div class="tengod-card">
                <div class="tg-title">${item.name}</div>
                <div class="tg-desc">${item.desc}</div>
            </div>
        `).join('');
    }

    // Init first step
    evolutionVisual.innerHTML = evolutionData[1].content;
});
