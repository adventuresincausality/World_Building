/* ==========================================================================
   THE SECOND FIRE — INTERACTIVE APPLICATION ENGINE
   Author: Sontlux
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initEtherCanvas();
    initLawsSection();
    initSandbox();
    initSpeciesSection();
    initTimelineSection();
});

/* --------------------------------------------------------------------------
   1. Ether Canvas Particle Background Simulation
   -------------------------------------------------------------------------- */
function initEtherCanvas() {
    const canvas = document.getElementById('ether-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(60, Math.floor(width / 25));

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, ',
            alpha: Math.random() * 0.6 + 0.2,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.5 - 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -10) p.y = height + 10;
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Core Physics Laws Data & UI
   -------------------------------------------------------------------------- */
const LAWS_DATA = [
    {
        num: "LAW 1",
        title: "Ether as Cognitive Substrate",
        summary: "Magic is a physical field responsive to pattern.",
        details: "Ether is an ambient potential-meaning field. Conscious minds configure it intentionally through language; non-conscious structures (crystals, DNA, rivers) configure it passively."
    },
    {
        num: "LAW 2",
        title: "Dual-Engine Cost Mechanism",
        summary: "Biological metabolic cost vs. Local ether depletion.",
        details: "Holding a pattern costs biological energy (fatigue/hunger, higher for novelty). Configuring substrate depletes local ambient ether, creating bleached zones until recharged."
    },
    {
        num: "LAW 3",
        title: "Carrying Capacity & Wild Magic Overflow",
        summary: "Unspent excess ether becomes unstable hazards.",
        details: "Dense population and pattern draw ambient surplus ether. If unspent, excess potential triggers spontaneous configurations—spawning wild magic anomalies and elemental golems."
    },
    {
        num: "LAW 4",
        title: "Water-Memory & Structural Infrastructure",
        summary: "Ether retains past spell shapes over time.",
        details: "Repeated casting grooves the local substrate, reducing future cost. Decay is prevented by permanent structural reinforcers like crystals, megaliths, and dwarf stonework."
    },
    {
        num: "LAW 5",
        title: "Magic is Not Self-Evident",
        summary: "The rules are invisible and historically misunderstood.",
        details: "Nobody can see ether directly. Civilizations construct religious liturgies, noble bloodline myths, and sacrifices to manage laws they don't fully comprehend."
    },
    {
        num: "LAW 6",
        title: "Centrifugal Academy Migration",
        summary: "High magical learning must flee population centers.",
        details: "Heavy deliberate casting inside dense cities causes explosive ether feedback. Higher magical academies are forced into remote desert peaks and secluded monasteries."
    },
    {
        num: "LAW 7",
        title: "Literacy as Precondition for Expansion",
        summary: "Only organized, literate societies colonize.",
        details: "Illiterate warbands are annihilated by goblins or blow up from unmanaged ether. Frontier expansion requires written liturgy, drain schedules, and structured load balancing."
    }
];

function initLawsSection() {
    const container = document.getElementById('laws-container');
    container.innerHTML = LAWS_DATA.map((law, index) => `
        <div class="law-card ${index === 0 ? 'active' : ''}" onclick="toggleLawCard(this)">
            <div class="law-number">${law.num}</div>
            <h3>${law.title}</h3>
            <p>${law.summary}</p>
            <div class="law-details" style="${index === 0 ? 'display:block;' : 'display:none;'}">
                ${law.details}
            </div>
        </div>
    `).join('');
}

window.toggleLawCard = function(card) {
    const details = card.querySelector('.law-details');
    const isOpen = details.style.display === 'block';
    
    document.querySelectorAll('.law-details').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.law-card').forEach(el => el.classList.remove('active'));

    if (!isOpen) {
        details.style.display = 'block';
        card.classList.add('active');
    }
};

/* --------------------------------------------------------------------------
   3. Interactive Physics Sandbox Calculator
   -------------------------------------------------------------------------- */
function initSandbox() {
    const rEther = document.getElementById('range-ether');
    const rNovelty = document.getElementById('range-novelty');
    const rLiturgy = document.getElementById('range-liturgy');
    const rReinforce = document.getElementById('range-reinforce');

    const vEther = document.getElementById('val-ether');
    const vNovelty = document.getElementById('val-novelty');
    const vLiturgy = document.getElementById('val-liturgy');
    const vReinforce = document.getElementById('val-reinforce');

    const statusText = document.getElementById('status-text');
    const statusSubtext = document.getElementById('status-subtext');
    const barOverflow = document.getElementById('bar-overflow');
    const barCost = document.getElementById('bar-cost');
    const barAnomaly = document.getElementById('bar-anomaly');
    const valOverflow = document.getElementById('val-meter-overflow');
    const valCost = document.getElementById('val-meter-cost');
    const valAnomaly = document.getElementById('val-meter-anomaly');
    const sandboxLog = document.getElementById('sandbox-log');

    function updateCalculations() {
        const e = parseInt(rEther.value);
        const n = parseInt(rNovelty.value);
        const l = parseInt(rLiturgy.value);
        const r = parseInt(rReinforce.value);

        vEther.textContent = e + '%';
        vNovelty.textContent = n + '%';
        vLiturgy.textContent = l + '%';
        vReinforce.textContent = r + '%';

        // Overflow calculation: (Ether + Novelty) - (Liturgy + Reinforce * 0.5)
        let overflow = Math.max(0, Math.min(100, Math.round((e * 0.5 + n * 0.6) - (l * 0.7 + r * 0.3))));
        
        // Biological Cost: High when Novelty is high & Ether is low
        let costVal = Math.max(0, Math.min(100, Math.round((n * 0.8) - (e * 0.4) - (r * 0.2) + 30)));
        
        // Anomaly Risk: Directly proportional to unspent overflow
        let anomaly = Math.max(0, Math.min(100, Math.round(overflow * 0.95)));

        barOverflow.style.width = overflow + '%';
        barCost.style.width = costVal + '%';
        barAnomaly.style.width = anomaly + '%';

        valOverflow.textContent = overflow + '%';
        valCost.textContent = costVal > 70 ? 'Extreme Exhaustion' : costVal > 40 ? 'Moderate Fatigue' : 'Low (Practiced)';
        valAnomaly.textContent = anomaly > 60 ? `HIGH RISK (${anomaly}%)` : `${anomaly}%`;

        // Update State Message
        if (overflow > 65) {
            statusText.textContent = "CRITICAL WILD MAGIC OVERFLOW!";
            statusText.style.color = "#FF6B35";
            statusSubtext.textContent = "Unspent substrate potential has reached critical density. Spontaneous elemental golems emerging!";
            sandboxLog.innerHTML = `<strong>ALERT:</strong> Liturgy schedule overwhelmed. City requires urgent desert college intervention.`;
        } else if (e < 25 && n < 20) {
            statusText.textContent = "ETHER BLEACHED SUBSTRATE";
            statusText.style.color = "#9CA3AF";
            statusSubtext.textContent = "Substrate is depleted and stagnant. Casting novelty requires massive metabolic fatigue.";
            sandboxLog.innerHTML = `<strong>LOG:</strong> Regional stagnation detected. Mages must push innovation to draw new ether.`;
        } else {
            statusText.textContent = "STABLE GROOVED SUBSTRATE";
            statusText.style.color = "#00F2FE";
            statusSubtext.textContent = "Ether intake matches municipal draining capacity. Settlement is safe and sustainable.";
            sandboxLog.innerHTML = `<strong>LOG:</strong> Liturgy and dwarf stonework maintain equilibrium. Ambient magic is predictable.`;
        }
    }

    [rEther, rNovelty, rLiturgy, rReinforce].forEach(input => input.addEventListener('input', updateCalculations));
    updateCalculations();
}

/* --------------------------------------------------------------------------
   4. Derived Species Data & Tab Switcher
   -------------------------------------------------------------------------- */
const SPECIES_DATA = {
    elves: {
        title: "Elves — Generational Groovers & Monomaniacs",
        trait: "Deep Personal Substrate Reinforcers",
        desc: "Elves are driven by intense lifelong obsessions rather than broad empire building. Young elves spend a century wandering ('dysphora') sampling patterns before settling down to spent a millennium grooving a single location or concept into substrate.",
        mechanic: "High site-specific magic; slow reproduction; helpless when displaced from ancestral grooves."
    },
    dwarves: {
        title: "Dwarves — Terroir & Crystalline Cognition",
        trait: "Externalized Mineral RAM",
        desc: "Dwarves do not hold magic inside their minds; they offload cognition into surrounding mineral lattices. A dwarf in an iron vein thinks martial, polar thoughts; in a quartz geode, vibrational memory. Migrating between minerals causes cognitive conversion trauma.",
        mechanic: "Permanent non-decaying architectural reinforcers; extreme geological specialization."
    },
    goblins: {
        title: "Goblins — Overflow-Riders & Terraformers",
        trait: "Unwitting Frontier Terraforming",
        desc: "Goblins evolved inside wild magic zones, metabolizing surplus substrate. They expand explosively into unspent ether pools, cast cheap improvisational spells, but bleach the region and trigger wild magic collapses that annihilate their own warrens.",
        mechanic: "Fast expansion, zero biological cost, sawtooth boom-and-bust cycle."
    },
    myrmedons: {
        title: "Myrmedons — The Society IS The Spell",
        trait: "Emergent Hive Magic",
        desc: "Individually dim insectoid beings whose social arrangements (caste movements, tunnel geometries) act as massive standing spells. A colony can summon rain across a kingdom, but uncontrolled growth outpaces structural novelty—causing self-annihilation.",
        mechanic: "Titanic magical capacity capped strictly by structural social complexity."
    },
    humans: {
        title: "Humans — Portable Pattern & Contagious Tempo",
        trait: "Structured Novelty & Writing",
        desc: "Humans are the only species combining grooving, building, innovation, and collective organization. By decoupling magic from geography through written portable liturgy, human empires scale at the speed of literacy.",
        mechanic: "Rapid cultural adaptation, compounding knowledge across generations."
    }
};

function initSpeciesSection() {
    const buttons = document.querySelectorAll('.species-tabs .tab-btn');
    const display = document.getElementById('species-content');

    function renderSpecies(key) {
        const data = SPECIES_DATA[key];
        display.innerHTML = `
            <div class="species-header">
                <h3>${data.title}</h3>
                <span class="logo-badge">${data.trait}</span>
            </div>
            <p style="font-size: 1.1rem; margin: 16px 0;">${data.desc}</p>
            <div class="sandbox-prediction">
                <strong>Systemic Rule:</strong> ${data.mechanic}
            </div>
        `;
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSpecies(btn.dataset.species);
        });
    });

    renderSpecies('elves');
}

/* --------------------------------------------------------------------------
   5. Historical Engine Eras & Stepper
   -------------------------------------------------------------------------- */
const ERAS_DATA = [
    {
        name: "Era I: Pre-Sapient",
        title: "The Enchanted Landscape",
        text: "Before sapience, animal instinct and active geology hold passive ether patterns. Forests compute and crystal caves hum with static magic."
    },
    {
        name: "Era II: Mesolithic",
        title: "Sacred Groves & Water-Memory",
        text: "Human bands camp the same valleys for generations, discovering that ancestral ground casts easier. The first megaliths are carved as ether memory drives."
    },
    {
        name: "Era III: Neolithic",
        title: "Settlement & The Overflow Crisis",
        text: "Villages cross population thresholds, drawing excess ether. Organized liturgy and priest-kings emerge to drain municipal surplus before wild magic destroys the town."
    },
    {
        name: "Era IV: Bronze Age",
        title: "Writing & Portable Pattern",
        text: "Invention of written liturgy decouples magic from geography. Spells can now be mailed across continents, starting the first human empires."
    },
    {
        name: "Era V: Iron Age",
        title: "Systematized Misunderstandings",
        text: "Empires codify wrong theories: noble bloodline myths and divine wrath temples. Cities partner with dwarven masons for permanent foundation stones."
    },
    {
        name: "Era VI: Scholastic Era",
        title: "The Desert College Revolution",
        text: "Secluded mountain monasteries reverse-engineer the true 7 Laws. Tension peaks between temple priests enforcing sacred errors and desert scholars holding thermodynamic truth."
    }
];

function initTimelineSection() {
    const nav = document.getElementById('timeline-nav');
    const display = document.getElementById('timeline-display');

    nav.innerHTML = ERAS_DATA.map((era, index) => `
        <button class="era-btn ${index === 0 ? 'active' : ''}" onclick="selectEra(${index})">
            <strong>${era.name}</strong>
        </button>
    `).join('');

    window.selectEra = function(index) {
        document.querySelectorAll('.era-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        const era = ERAS_DATA[index];
        display.innerHTML = `
            <h3>${era.name}: ${era.title}</h3>
            <p style="font-size: 1.15rem; margin-top: 16px;">${era.text}</p>
        `;
    };

    selectEra(0);
}
