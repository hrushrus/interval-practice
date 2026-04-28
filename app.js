// VexFlow setup
const VF = Vex.Flow;

// Game State
const state = {
    currentUser: null,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalScore: 0,
    trainingType: 'intervals',
    currentMode: 'audio',
    playbackMode: 'melodic',
    currentBaseMidi: null,
    currentChallenge: null,
    isToneInitialized: false,
    samplerLoaded: false,
    currentRhythmSequence: [],
    userRhythmInput: [],
    currentTimeSignature: '4/4',
    rhythmDifficulty: 1,
    rhythmCorrectCount: 0
};

// Data Definitions
const DATA = {
    intervals: {
        question: "What interval is this?",
        options: [
            { id: 1, label: "m2", name: "Minor 2nd (m2)", offset: [0, 1] },
            { id: 2, label: "M2", name: "Major 2nd (M2)", offset: [0, 2] },
            { id: 3, label: "m3", name: "Minor 3rd (m3)", offset: [0, 3] },
            { id: 4, label: "M3", name: "Major 3rd (M3)", offset: [0, 4] },
            { id: 5, label: "P4", name: "Perfect 4th (P4)", offset: [0, 5] },
            { id: 6, label: "TT", name: "Tritone (TT)", offset: [0, 6] },
            { id: 7, label: "P5", name: "Perfect 5th (P5)", offset: [0, 7] },
            { id: 8, label: "m6", name: "Minor 6th (m6)", offset: [0, 8] },
            { id: 9, label: "M6", name: "Major 6th (M6)", offset: [0, 9] },
            { id: 10, label: "m7", name: "Minor 7th (m7)", offset: [0, 10] },
            { id: 11, label: "M7", name: "Major 7th (M7)", offset: [0, 11] },
            { id: 12, label: "P8", name: "Perfect Octave (P8)", offset: [0, 12] }
        ]
    },
    chords: {
        question: "What chord is this?",
        options: [
            { id: 'major', label: "Major", name: "Major Triad", offset: [0, 4, 7] },
            { id: 'minor', label: "Minor", name: "Minor Triad", offset: [0, 3, 7] },
            { id: 'dim', label: "Diminished", name: "Diminished Triad", offset: [0, 3, 6] },
            { id: 'aug', label: "Augmented", name: "Augmented Triad", offset: [0, 4, 8] }
        ]
    },
    scales: {
        question: "What scale is this?",
        options: [
            { id: 'major', label: "Major", name: "Major Scale", offset: [0, 2, 4, 5, 7, 9, 11, 12] },
            { id: 'minor', label: "Nat Minor", name: "Natural Minor Scale", offset: [0, 2, 3, 5, 7, 8, 10, 12] },
            { id: 'harmonic', label: "Harm Minor", name: "Harmonic Minor Scale", offset: [0, 2, 3, 5, 7, 8, 11, 12] },
            { id: 'melodic', label: "Mel Minor", name: "Melodic Minor Scale", offset: [0, 2, 3, 5, 7, 9, 11, 12] }
        ]
    },
    pitch: {
        question: "What pitch is this?",
        options: [
            { id: 'C', label: "C", name: "Pitch: C", offset: [0] },
            { id: 'C#', label: "C#", name: "Pitch: C#", offset: [1] },
            { id: 'D', label: "D", name: "Pitch: D", offset: [2] },
            { id: 'D#', label: "D#", name: "Pitch: D#", offset: [3] },
            { id: 'E', label: "E", name: "Pitch: E", offset: [4] },
            { id: 'F', label: "F", name: "Pitch: F", offset: [5] },
            { id: 'F#', label: "F#", name: "Pitch: F#", offset: [6] },
            { id: 'G', label: "G", name: "Pitch: G", offset: [7] },
            { id: 'G#', label: "G#", name: "Pitch: G#", offset: [8] },
            { id: 'A', label: "A", name: "Pitch: A", offset: [9] },
            { id: 'A#', label: "A#", name: "Pitch: A#", offset: [10] },
            { id: 'B', label: "B", name: "Pitch: B", offset: [11] }
        ]
    },
    rhythm: {
        question: "Recreate the rhythm you heard",
        timeSignatures: ['4/4', '3/4', '2/4', '6/8'],
        noteTypes: {
            'w': { duration: 'w', beats: { '4/4': 4, '3/4': 4, '2/4': 4, '6/8': 8 } },
            'h': { duration: 'h', beats: { '4/4': 2, '3/4': 2, '2/4': 2, '6/8': 4 } },
            'q': { duration: 'q', beats: { '4/4': 1, '3/4': 1, '2/4': 1, '6/8': 2 } },
            '8': { duration: '8', beats: { '4/4': 0.5, '3/4': 0.5, '2/4': 0.5, '6/8': 1 } },
            '16': { duration: '16', beats: { '4/4': 0.25, '3/4': 0.25, '2/4': 0.25, '6/8': 0.5 } },
            'wr': { duration: 'wr', beats: { '4/4': 4, '3/4': 4, '2/4': 4, '6/8': 8 } },
            'hr': { duration: 'hr', beats: { '4/4': 2, '3/4': 2, '2/4': 2, '6/8': 4 } },
            'qr': { duration: 'qr', beats: { '4/4': 1, '3/4': 1, '2/4': 1, '6/8': 2 } },
            '8r': { duration: '8r', beats: { '4/4': 0.5, '3/4': 0.5, '2/4': 0.5, '6/8': 1 } },
            '16r': { duration: '16r', beats: { '4/4': 0.25, '3/4': 0.25, '2/4': 0.25, '6/8': 0.5 } }
        }
    }
};

// DOM Elements
const uiElements = {
    userOverlay: document.getElementById('user-overlay'),
    sophieBtn: document.getElementById('sophie-btn'),
    chrisBtn: document.getElementById('chris-btn'),
    switchUserBtn: document.getElementById('switch-user-btn'),
    appTitle: document.getElementById('app-title'),
    trainingSelect: document.getElementById('training-select'),
    modeSelect: document.getElementById('mode-select'),
    playbackSelect: document.getElementById('playback-select'),
    audioUi: document.getElementById('audio-ui'),
    visualUi: document.getElementById('visual-ui'),
    playBtn: document.getElementById('play-btn'),
    scoreDisplay: document.getElementById('score'),
    streakDisplay: document.getElementById('streak'),
    bestStreakDisplay: document.getElementById('best-streak'),
    resetBtn: document.getElementById('reset-btn'),
    feedbackMsg: document.getElementById('feedback'),
    nextBtn: document.getElementById('next-btn'),
    rankingsOverlay: document.getElementById('rankings-overlay'),
    rankingsBody: document.getElementById('rankings-body'),
    viewRankingsBtn: document.getElementById('view-rankings-btn'),
    closeRankingsBtn: document.getElementById('close-rankings-btn'),
    endSessionBtn: document.getElementById('end-session-btn'),
    progressOverlay: document.getElementById('progress-overlay'),
    closeProgressBtn: document.getElementById('close-progress-btn'),
    viewProgressBtn: document.getElementById('view-progress-btn'),
    progressChartCanvas: document.getElementById('progress-chart'),
    buttonGrid: document.getElementById('button-grid'),
    staffContainer: document.getElementById('staff-container'),
    challengeQuestion: document.getElementById('challenge-question'),
    rhythmInputUi: document.getElementById('rhythm-input-ui'),
    rhythmUndoBtn: document.getElementById('rhythm-undo-btn'),
    rhythmClearBtn: document.getElementById('rhythm-clear-btn'),
    rhythmSubmitBtn: document.getElementById('rhythm-submit-btn'),
    rhythmAnnouncement: document.getElementById('rhythm-announcement'),
    tsDisplay: document.getElementById('ts-display')
};

let progressChart = null;

// Tone.js Sampler (Piano)
const sampler = new Tone.Sampler({
    urls: {
        A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3",
        A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3",
        A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3",
        A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3",
        A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
        A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3",
        A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3",
        A7: "A7.mp3", C8: "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
        state.samplerLoaded = true;
        uiElements.playBtn.innerText = "Play Challenge";
        uiElements.playBtn.disabled = false;
        if (state.currentUser) generateNewChallenge();
    }
}).toDestination();

// User Management
async function selectUser(user) {
    console.log("Selecting user:", user);
    state.currentUser = user;
    localStorage.setItem('activeUser', user);
    
    // Force Audio Context Start on user gesture (crucial for iOS)
    if (!state.isToneInitialized) {
        try {
            await Tone.start();
            state.isToneInitialized = true;
            console.log("Audio Context Started");
        } catch (e) {
            console.error("Audio start failed:", e);
        }
    }
    
    // Apply Theme
    if (user === 'chris') {
        document.body.classList.add('chris-theme');
        uiElements.appTitle.innerText = "Chris' interval practice";
    } else {
        document.body.classList.remove('chris-theme');
        uiElements.appTitle.innerText = "Sophie's interval practice";
    }

    // Load Scores
    state.totalScore = parseInt(localStorage.getItem(`${user}_totalScore`)) || 0;
    state.bestStreak = parseInt(localStorage.getItem(`${user}_bestStreak`)) || 0;
    state.streak = 0;

    updateScoreDisplay();
    uiElements.userOverlay.classList.add('hidden');
    
    if (state.samplerLoaded) {
        generateNewChallenge();
    }
}

function showUserSelection() {
    uiElements.userOverlay.classList.remove('hidden');
}

// Event Listeners
uiElements.sophieBtn.addEventListener('click', () => selectUser('sophie'));
uiElements.chrisBtn.addEventListener('click', () => selectUser('chris'));
uiElements.switchUserBtn.addEventListener('click', showUserSelection);
uiElements.viewRankingsBtn.addEventListener('click', showRankings);
uiElements.closeRankingsBtn.addEventListener('click', closeRankings);
uiElements.viewProgressBtn.addEventListener('click', showProgress);
uiElements.closeProgressBtn.addEventListener('click', closeProgress);
uiElements.endSessionBtn.addEventListener('click', endSession);

uiElements.trainingSelect.addEventListener('change', (e) => {
    state.trainingType = e.target.value;
    generateNewChallenge();
});

uiElements.modeSelect.addEventListener('change', (e) => {
    state.currentMode = e.target.value;
    updateUIMode();
    presentCurrentChallenge();
});

uiElements.playbackSelect.addEventListener('change', (e) => {
    state.playbackMode = e.target.value;
});

uiElements.playBtn.addEventListener('click', async () => {
    // Aggressively try to start/resume audio context
    if (!state.isToneInitialized || Tone.context.state !== 'running') {
        try {
            await Tone.start();
            await Tone.context.resume();
            state.isToneInitialized = true;
        } catch (e) {
            console.error("Audio resume failed:", e);
        }
    }
    playCurrentChallenge();
});

uiElements.nextBtn.addEventListener('click', () => {
    generateNewChallenge();
});

uiElements.resetBtn.addEventListener('click', () => {
    if (confirm(`Reset all scores for ${state.currentUser}?`)) {
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.totalScore = 0;
        localStorage.removeItem(`${state.currentUser}_totalScore`);
        localStorage.removeItem(`${state.currentUser}_bestStreak`);
        updateScoreDisplay();
    }
});

initRhythmListeners();

function endSession() {
    if (state.totalScore === 0) {
        alert("Get some points before ending the session!");
        return;
    }

    if (confirm(`Finish your session with ${state.totalScore} points and save to Rankings?`)) {
        const history = JSON.parse(localStorage.getItem('interval_practice_history')) || [];
        const entry = {
            id: Date.now().toString(),
            user: state.currentUser,
            score: state.totalScore,
            date: new Date().toISOString()
        };
        
        history.push(entry);
        localStorage.setItem('interval_practice_history', JSON.stringify(history));
        
        // Reset current session
        state.totalScore = 0;
        state.streak = 0;
        localStorage.removeItem(`${state.currentUser}_totalScore`); // Reset their "current" running score
        
        updateScoreDisplay();
        showRankings();
        generateNewChallenge();
    }
}

function showRankings() {
    const history = JSON.parse(localStorage.getItem('interval_practice_history')) || [];
    
    // Sort by score (desc), then date (desc)
    const sorted = history.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.date) - new Date(a.date);
    });

    uiElements.rankingsBody.innerHTML = '';
    
    if (sorted.length === 0) {
        uiElements.rankingsBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem;">No sessions saved yet!</td></tr>';
    } else {
        sorted.slice(0, 50).forEach((entry, index) => {
            const row = document.createElement('tr');
            const dateObj = new Date(entry.date);
            const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + 
                          dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            row.innerHTML = `
                <td class="rank-cell">#${index + 1}</td>
                <td class="user-cell">${entry.user}</td>
                <td class="score-cell">${entry.score}</td>
                <td class="date-cell">${dateStr}</td>
            `;
            uiElements.rankingsBody.appendChild(row);
        });
    }

    uiElements.rankingsOverlay.classList.remove('hidden');
}

function closeRankings() {
    uiElements.rankingsOverlay.classList.add('hidden');
}

function showProgress() {
    const history = JSON.parse(localStorage.getItem('interval_practice_history')) || [];
    
    if (history.length === 0) {
        alert("No practice history yet! Finish a session to see your progress.");
        return;
    }

    uiElements.progressOverlay.classList.remove('hidden');
    
    // Group and Sort history by date
    const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const users = ['sophie', 'chris'];
    const datasets = [];
    
    // Prepare colors
    const colors = {
        sophie: {
            border: '#6366f1',
            bg: 'rgba(99, 102, 241, 0.1)'
        },
        chris: {
            border: '#059669',
            bg: 'rgba(5, 150, 105, 0.1)'
        }
    };

    users.forEach(user => {
        const userHistory = sortedHistory.filter(h => h.user === user);
        if (userHistory.length === 0) return;

        let cumulativeScore = 0;
        const data = userHistory.map((entry, index) => {
            cumulativeScore += entry.score;
            const avg = cumulativeScore / (index + 1);
            return {
                x: new Date(entry.date),
                y: avg
            };
        });

        datasets.push({
            label: user.charAt(0).toUpperCase() + user.slice(1),
            data: data,
            borderColor: colors[user].border,
            backgroundColor: colors[user].bg,
            borderWidth: 3,
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
        });
    });

    if (progressChart) {
        progressChart.destroy();
    }

    progressChart = new Chart(uiElements.progressChartCanvas, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM d'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Score'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1);
                        }
                    }
                }
            }
        }
    });
}

function closeProgress() {
    uiElements.progressOverlay.classList.add('hidden');
}

// Logic Functions
function updateUIMode() {
    if (state.currentMode === 'audio') {
        uiElements.audioUi.classList.remove('hidden');
        uiElements.audioUi.classList.add('active');
        uiElements.visualUi.classList.add('hidden');
    } else {
        uiElements.audioUi.classList.remove('active');
        uiElements.audioUi.classList.add('hidden');
        uiElements.visualUi.classList.remove('hidden');
    }
}

function getBeatsPerBar(ts) {
    const [num, den] = ts.split('/').map(Number);
    // For VexFlow voices and our logic, we need to know the number of beats
    // and the value of each beat.
    return num;
}

function canAddNote(type) {
    const ts = state.currentTimeSignature;
    const [num, den] = ts.split('/').map(Number);
    const maxBeats = num * 2;
    let currentBeats = state.userRhythmInput.reduce((sum, t) => sum + DATA.rhythm.noteTypes[t].beats[ts], 0);
    return (currentBeats + DATA.rhythm.noteTypes[type].beats[ts]) <= maxBeats;
}

function generateRandomRhythm(ts, bars) {
    const sequence = [];
    const [num, den] = ts.split('/').map(Number);
    const beatsPerBar = num;
    const types = Object.keys(DATA.rhythm.noteTypes);
    
    // Explicit weights based on difficulty
    const getWeight = (type) => {
        const isRest = type.endsWith('r');
        const level = state.rhythmDifficulty;

        // Level 1: Absolutely no rests, no 16ths
        if (level === 1) {
            if (isRest || type === '16') return 0;
            if (type === '8') return 0.1;
            return 0.5;
        }

        // Difficulty scaling for rare items
        if (type === '8r' || type === '16r') {
            return level >= 5 ? 0.05 : 0; 
        }
        
        if (type === '16' || type === '8') {
            return level >= 3 ? 0.4 : 0.1;
        }

        if (isRest) {
            // Standard rests appear more as level increases
            return level >= 2 ? 0.15 : 0; 
        }

        return 0.5; // Standard notes
    };

    for (let i = 0; i < bars; i++) {
        let remaining = beatsPerBar;
        while (remaining > 0) {
            const possible = types.filter(t => DATA.rhythm.noteTypes[t].beats[ts] <= remaining);
            if (possible.length === 0) break;
            
            const weighted = [];
            possible.forEach(t => {
                const w = getWeight(t);
                if (w > 0) {
                    const count = Math.ceil(w * 100);
                    for(let j=0; j<count; j++) weighted.push(t);
                }
            });

            // Fallback: If no weighted options, just pick the smallest available note
            if (weighted.length === 0) {
                const smallest = possible.sort((a, b) => DATA.rhythm.noteTypes[a].beats[ts] - DATA.rhythm.noteTypes[b].beats[ts])[0];
                sequence.push(smallest);
                remaining -= DATA.rhythm.noteTypes[smallest].beats[ts];
                continue;
            }

            const type = weighted[Math.floor(Math.random() * weighted.length)];
            sequence.push(type);
            remaining -= DATA.rhythm.noteTypes[type].beats[ts];
        }
    }
    return sequence;
}

function generateRhythmChallenge() {
    // Progressive Time Signatures
    let availableTS = ['4/4', '2/4'];
    if (state.rhythmDifficulty >= 2) availableTS.push('3/4');
    if (state.rhythmDifficulty >= 4) availableTS.push('6/8');

    const ts = availableTS[Math.floor(Math.random() * availableTS.length)];
    state.currentTimeSignature = ts;
    uiElements.tsDisplay.innerText = ts;
    
    state.userRhythmInput = [];
    state.currentRhythmSequence = generateRandomRhythm(ts, 2);
    
    uiElements.visualUi.classList.remove('hidden');
    uiElements.feedbackMsg.innerText = `Level ${state.rhythmDifficulty}`;
    uiElements.feedbackMsg.style.color = "var(--text-muted)";
    renderStaff();
}

function generateNewChallenge() {
    if (!state.currentUser) return;
    uiElements.nextBtn.classList.add('hidden');
    uiElements.feedbackMsg.innerText = "";
    uiElements.feedbackMsg.style.color = "var(--text-color)";

    if (state.trainingType === 'rhythm') {
        uiElements.buttonGrid.classList.add('hidden');
        uiElements.rhythmInputUi.classList.remove('hidden');
        uiElements.rhythmAnnouncement.classList.add('hidden'); // Ensure announcement is hidden
        uiElements.challengeQuestion.innerText = DATA.rhythm.question;
        generateRhythmChallenge();
        return;
    }

    // Standard Challenge Logic
    uiElements.buttonGrid.classList.remove('hidden');
    uiElements.rhythmInputUi.classList.add('hidden');
    uiElements.rhythmAnnouncement.classList.add('hidden');
    
    // Pick base note based on type
    if (state.trainingType === 'pitch') {
        state.currentBaseMidi = Math.floor(Math.random() * 24) + 53; // Larger range F3 to F5
    } else {
        state.currentBaseMidi = Math.floor(Math.random() * 8) + 60; // C4 to G4
    }

    // Pick random option
    const options = DATA[state.trainingType].options;
    state.currentChallenge = options[Math.floor(Math.random() * options.length)];

    // Rebuild Button Grid
    uiElements.buttonGrid.innerHTML = '';
    uiElements.challengeQuestion.innerText = DATA[state.trainingType].question;

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'interval-btn';
        btn.innerText = opt.label;
        btn.dataset.id = opt.id;
        btn.addEventListener('click', () => handleGuess(opt.id, btn));
        uiElements.buttonGrid.appendChild(btn);
    });

    if (state.trainingType === 'rhythm' || state.currentMode === 'visual') {
        uiElements.visualUi.classList.remove('hidden');
    } else {
        uiElements.visualUi.classList.add('hidden');
    }
    presentCurrentChallenge();
}

function presentCurrentChallenge() {
    if (!state.currentChallenge) return;
    if (state.currentMode === 'visual') {
        uiElements.visualUi.classList.remove('hidden');
        renderStaff();
    }
}

function midiToFrequency(midi) {
    return Math.pow(2, (midi - 69) / 12) * 440;
}

function playRhythmSequence(sequence, startTime) {
    let currentTime = startTime;
    const bpm = 90;
    const secondsPerBeat = 60 / bpm;
    
    sequence.forEach(type => {
        const isRest = type.endsWith('r');
        const duration = isRest ? type.slice(0, -1) : type;
        const toneDuration = duration === 'w' ? '1n' : duration === 'h' ? '2n' : duration === 'q' ? '4n' : duration === '8' ? '8n' : '16n';
        
        if (!isRest) {
            sampler.triggerAttackRelease("C4", toneDuration, currentTime);
        }
        
        const beats = DATA.rhythm.noteTypes[type].beats[state.currentTimeSignature];
        currentTime += beats * secondsPerBeat;
    });
}

function playCurrentChallenge() {
    if (!state.samplerLoaded) return;
    
    const now = Tone.now();
    
    if (state.trainingType === 'rhythm') {
        playRhythmSequence(state.currentRhythmSequence, now);
        return;
    }

    const offsets = state.trainingType === 'pitch' ? [0] : state.currentChallenge.offset;
    const frequencies = offsets.map(off => midiToFrequency(state.currentBaseMidi + off));

    if (state.trainingType === 'scales') {
        frequencies.forEach((freq, i) => {
            sampler.triggerAttackRelease(freq, "4n", now + i * 0.4);
        });
    } else if (state.trainingType === 'pitch') {
        sampler.triggerAttackRelease(frequencies[0], "2n", now);
    } else if (state.playbackMode === 'melodic') {
        frequencies.forEach((freq, i) => {
            sampler.triggerAttackRelease(freq, "4n", now + i * 0.5);
        });
    } else {
        sampler.triggerAttackRelease(frequencies, "2n", now);
    }
}

function handleGuess(guessId, btn) {
    const correctId = state.currentChallenge.id;
    const allBtns = uiElements.buttonGrid.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    uiElements.visualUi.classList.remove('hidden');
    renderStaff();
    uiElements.nextBtn.classList.remove('hidden');

    if (guessId === correctId) {
        state.score += 1;
        state.streak += 1;
        state.totalScore += 1;
        if (state.streak > state.bestStreak) {
            state.bestStreak = state.streak;
        }
        
        // Save to LocalStorage
        localStorage.setItem(`${state.currentUser}_totalScore`, state.totalScore);
        localStorage.setItem(`${state.currentUser}_bestStreak`, state.bestStreak);

        btn.classList.add('correct');
        uiElements.feedbackMsg.innerText = "Correct! " + state.currentChallenge.name;
        uiElements.feedbackMsg.style.color = "var(--success-color)";
        playCurrentChallenge();
    } else {
        state.streak = 0;
        state.totalScore -= 1; // Negative scoring allowed
        
        // Save to LocalStorage even on incorrect to persist negative scores
        localStorage.setItem(`${state.currentUser}_totalScore`, state.totalScore);

        btn.classList.add('incorrect');
        uiElements.feedbackMsg.innerText = "Incorrect (-1). It was " + state.currentChallenge.name;
        uiElements.feedbackMsg.style.color = "var(--error-color)";
        const correctBtn = Array.from(allBtns).find(b => b.dataset.id == correctId);
        if (correctBtn) correctBtn.classList.add('correct');
    }
    updateScoreDisplay();
}

function handleRhythmGuess() {
    const correct = state.currentRhythmSequence.join(',');
    const guess = state.userRhythmInput.join(',');

    uiElements.visualUi.classList.remove('hidden');
    renderStaff();
    uiElements.nextBtn.classList.remove('hidden');

    if (correct === guess) {
        state.score += 1;
        state.streak += 1;
        state.totalScore += (1 + state.rhythmDifficulty); // Scale score with difficulty
        
        state.rhythmCorrectCount += 1;
        if (state.rhythmCorrectCount >= 3) {
            state.rhythmDifficulty += 1;
            state.rhythmCorrectCount = 0;
        }

        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        
        localStorage.setItem(`${state.currentUser}_totalScore`, state.totalScore);
        localStorage.setItem(`${state.currentUser}_bestStreak`, state.bestStreak);

        uiElements.feedbackMsg.innerText = "Perfect! Level Up progressing...";
        uiElements.feedbackMsg.style.color = "var(--success-color)";
        playCurrentChallenge();
    } else {
        state.streak = 0;
        state.totalScore -= 1;
        state.rhythmDifficulty = Math.max(1, state.rhythmDifficulty - 1); // Drop difficulty on error
        state.rhythmCorrectCount = 0;
        
        localStorage.setItem(`${state.currentUser}_totalScore`, state.totalScore);

        uiElements.feedbackMsg.innerText = "Not quite. Difficulty lowered.";
        uiElements.feedbackMsg.style.color = "var(--error-color)";
        
        // Show correct rhythm
        state.userRhythmInput = [...state.currentRhythmSequence];
        renderStaff();
        playCurrentChallenge();
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    uiElements.scoreDisplay.innerText = state.totalScore;
    uiElements.streakDisplay.innerText = state.streak;
    uiElements.bestStreakDisplay.innerText = state.bestStreak;
}

// Visual Rendering
function midiToVexNote(midi) {
    const NOTES = ["c", "c", "d", "d", "e", "f", "f", "g", "g", "a", "a", "b"];
    const ACCIDENTALS = ["", "#", "", "#", "", "", "#", "", "#", "", "#", ""];
    const noteClass = midi % 12;
    const note = NOTES[noteClass];
    const acc = ACCIDENTALS[noteClass];
    const octave = Math.floor(midi / 12) - 1;
    return { keys: [`${note}/${octave}`], accidental: acc };
}

function renderRhythmStaff(context) {
    const ts = state.currentTimeSignature;
    const [num, den] = ts.split('/').map(Number);
    
    // Widths for the two staves
    const stave1Width = 200;
    const stave2Width = 180;
    
    const stave1 = new VF.Stave(10, 20, stave1Width);
    stave1.addClef("treble").addTimeSignature(ts).setContext(context).draw();
    
    const stave2 = new VF.Stave(10 + stave1Width, 20, stave2Width);
    stave2.setContext(context).draw();

    const sequence = state.userRhythmInput;
    const beatsPerBar = num;
    
    const bar1Notes = [];
    const bar2Notes = [];
    let currentBeats = 0;
    
    sequence.forEach(type => {
        const val = DATA.rhythm.noteTypes[type].beats[ts];
        const isRest = type.endsWith('r');
        const noteParams = { clef: "treble", keys: [isRest ? "b/4" : "c/5"], duration: type };
        const note = new VF.StaveNote(noteParams);
        
        // Strictly allocate to bars based on accumulated beats
        // Use a tiny epsilon for float safety
        if (currentBeats + val <= beatsPerBar + 0.01) {
            bar1Notes.push(note);
        } else {
            bar2Notes.push(note);
        }
        currentBeats += val;
    });

    // Format and draw Bar 1
    if (bar1Notes.length > 0) {
        try {
            const voice1 = new VF.Voice({ num_beats: num, beat_value: den });
            voice1.setStrict(false);
            voice1.addTickables(bar1Notes);
            new VF.Formatter().joinVoices([voice1]).format([voice1], stave1Width - 50);
            voice1.draw(context, stave1);
        } catch (e) { console.error("VF Bar 1 Error:", e); }
    }
    
    // Format and draw Bar 2
    if (bar2Notes.length > 0) {
        try {
            const voice2 = new VF.Voice({ num_beats: num, beat_value: den });
            voice2.setStrict(false);
            voice2.addTickables(bar2Notes);
            new VF.Formatter().joinVoices([voice2]).format([voice2], stave2Width - 20);
            voice2.draw(context, stave2);
        } catch (e) { console.error("VF Bar 2 Error:", e); }
    }
}

function initRhythmListeners() {
    uiElements.rhythmUndoBtn.addEventListener('click', () => {
        state.userRhythmInput.pop();
        renderStaff();
    });

    uiElements.rhythmClearBtn.addEventListener('click', () => {
        state.userRhythmInput = [];
        renderStaff();
    });

    uiElements.rhythmSubmitBtn.addEventListener('click', () => {
        handleRhythmGuess();
    });

    document.querySelectorAll('.rhythm-note-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (canAddNote(type)) {
                state.userRhythmInput.push(type);
                renderStaff();
            }
        });
    });
}

function renderStaff() {
    uiElements.staffContainer.innerHTML = '';
    const renderer = new VF.Renderer(uiElements.staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(450, 150);
    const context = renderer.getContext();
    
    if (state.trainingType === 'rhythm') {
        renderRhythmStaff(context);
        return;
    }

    const stave = new VF.Stave(10, 20, 280);
    stave.addClef("treble").setContext(context).draw();

    const offsets = state.trainingType === 'pitch' ? [0] : state.currentChallenge.offset;
    const vexNotesData = offsets.map(off => midiToVexNote(state.currentBaseMidi + off));

    let notes;
    if (state.trainingType === 'chords' && state.playbackMode === 'harmonic') {
        const keys = vexNotesData.map(d => d.keys[0]);
        const chord = new VF.StaveNote({ clef: "treble", keys: keys, duration: "h" });
        vexNotesData.forEach((d, i) => {
            if (d.accidental) chord.addModifier(new VF.Accidental(d.accidental), i);
        });
        notes = [chord];
    } else {
        notes = vexNotesData.map(d => {
            const sn = new VF.StaveNote({ clef: "treble", keys: d.keys, duration: "q" });
            if (d.accidental) sn.addModifier(new VF.Accidental(d.accidental));
            return sn;
        });
    }

    const voice = new VF.Voice({ num_beats: notes.length, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(context, stave);
}

// Initial Launch
uiElements.playBtn.disabled = true;
uiElements.playBtn.innerText = "Loading Audio...";

const savedUser = localStorage.getItem('activeUser');
if (savedUser) {
    selectUser(savedUser);
} else {
    showUserSelection();
}
