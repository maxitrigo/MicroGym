const gymExercises = {
    pecho: [
        { name: 'Press de banca, agarre cerrado', variations: ['barra'], video: 'https://c.tenor.com/vsNKHqAvOKoAAAAd/tenor.gif' },
        { name: 'Press de banca, agarre amplio', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/vsNKHqAvOKoAAAAd/tenor.gif' },
        { name: 'Aperturas con mancuernas', variations: ['planas', 'inclinadas'], video: 'https://c.tenor.com/aeiQWNFbCL8AAAAd/tenor.gif' },
        { name: 'Press inclinado', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/2PdWlCSxHh4AAAAd/tenor.gif' },
        { name: 'Flexiones', variations: ['normales', 'diamante', 'arquero'], video: 'https://c.tenor.com/p5VGilBlRKIAAAAd/tenor.gif' },
        { name: 'Hex Press', variations: ['mancuernas'], video: 'https://c.tenor.com/Vhhf9PFyFSwAAAAd/tenor.gif' },
        { name: 'Pull-over', variations: ['mancuernas', 'polea'], video: 'https://c.tenor.com/iKKHtdZ2QwUAAAAd/tenor.gif' },
        { name: 'Press declinado', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/OgjLzf5LkqAAAAAd/tenor.gif' },
        { name: 'Cruces con polea alta', variations: [], video: 'https://c.tenor.com/p-__t8FMTtoAAAAd/tenor.gif' },
        { name: 'Peck Deck', variations: ['unilateral'], video: 'https://c.tenor.com/0-pLwbiwkhcAAAAd/tenor.gif' }
    ],
    espalda: [
        { name: 'Dominadas', variations: ['agarre supino', 'agarre prono', 'agarre neutro'], video: 'https://c.tenor.com/1sdrlkYXVsUAAAAd/tenor.gif' },
        { name: 'Remo con barra inclinado', variations: ['agarre prono', 'supino'], video: 'https://c.tenor.com/-Z-hLGN30WAAAAAd/tenor.gif' },
        { name: 'Remo en máquina', variations: ['unilateral', 'bilateral'], video: 'https://c.tenor.com/R069mkP-46sAAAAd/tenor.gif' },
        { name: 'Polea al pecho, agarre amplio', variations: ['agarre prono', 'supino'], video: 'https://c.tenor.com/AR6A1jMcnE8AAAAd/tenor.gif' },
        { name: 'Polea al pecho, agarre cerrado', variations: ['agarre prono', 'supino'], video: 'https://c.tenor.com/hI6Koi1EXhcAAAAd/tenor.gif' },
        { name: 'Face pulls', variations: ['con cuerda', 'con barra'], video: 'https://c.tenor.com/FGsBtkQCchwAAAAd/tenor.gif' },
        { name: 'Remo con mancuernas (serrucho)', variations: ['a una mano'], video: 'https://c.tenor.com/h_qAMNH5HJQAAAAd/tenor.gif' },
        { name: 'Remo invertido', variations: ['con barra', 'con TRX'], video: 'https://c.tenor.com/mUGlCgqdD7oAAAAd/tenor.gif' },
        { name: 'Renegade rows', variations: ['mancuernas'], video: 'https://c.tenor.com/HAiTm4qjrqUAAAAd/tenor.gif' }
    ],
    hombros: [
        { name: 'Press militar', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/t3Mn1PlTQwgAAAAd/tenor.gif' },
        { name: 'Vuelos laterales', variations: ['con mancuernas', 'con cable'], video: 'https://c.tenor.com/VdCASDhF7NMAAAAd/tenor.gif' },
        { name: 'Vuelos frontales', variations: ['mancuernas', 'con cable'], video: 'https://c.tenor.com/vFLnrUUJtRQAAAAd/tenor.gif' },
        { name: 'Vuelos posteriores', variations: ['mancuernas', 'con cable'], video: 'https://c.tenor.com/JS3Ru7KZxKkAAAAd/tenor.gif' },
        { name: 'Arnold Press', variations: [], video: 'https://c.tenor.com/ZR-_3Mxq0gYAAAAd/tenor.gif' },
        { name: 'Remo al menton', variations: ['con barra', 'con mancuernas'], video: 'https://c.tenor.com/StZ4pCYVM_AAAAAd/tenor.gif' },
        { name: 'Push press', variations: [], video: 'https://c.tenor.com/zM5e6c38ey4AAAAd/tenor.gif' },
        { name: 'Press trasnuca en Smith', variations: [], video: 'https://c.tenor.com/tpY3BAkaXCoAAAAd/tenor.gif' },
        { name: 'Press en Smith', variations: [], video: 'https://c.tenor.com/lnowW1jvKeAAAAAC/tenor.gif' },
        { name: 'Press frontal en maquina', variations: [], video: 'https://c.tenor.com/uhxIEHzn7moAAAAd/tenor.gif' }
    ],
    biceps: [
        { name: 'Curl con barra', variations: ['recta', 'W'], video: 'https://c.tenor.com/RL3CbJbPvhwAAAAd/tenor.gif' },
        { name: 'Curl concentrado', variations: [], video: 'https://c.tenor.com/RnW3GHiB6yUAAAAd/tenor.gif' },
        { name: 'Curl con mancuernas', variations: ['alterno', 'simultáneo'], video: 'https://c.tenor.com/6uinYQq-1TYAAAAd/tenor.gif' },
        { name: 'Curl de bíceps en Scott', variations: ['barra recta', 'barra W'], video: 'https://c.tenor.com/8LLi0g8NGKcAAAAd/tenor.gif' },
        { name: 'Curl en banco inclinado', variations: ['unilateral'], video: 'https://c.tenor.com/j6wkDQurcm8AAAAd/tenor.gif' },
        { name: 'Curl martillo', variations: ['con mancuernas', 'con barra'], video: 'https://c.tenor.com/kEGK-a7q__AAAAAd/tenor.gif' },
        { name: 'Curl con cuerda en polea', variations: [], video: 'https://c.tenor.com/EvRk-r-4dlwAAAAd/tenor.gif' },
        { name: 'Curl con polea', variations: ['baja'], video: 'https://c.tenor.com/GYDvpl2ycIYAAAAd/tenor.gif' },
    ],
    triceps: [
        { name: 'Fondos en paralelas', variations: [], video: 'https://c.tenor.com/7qFqk839s9wAAAAd/tenor.gif' },
        { name: 'Extensiones de tríceps en polea sobre cabeza', variations: ['con cuerda', 'barra'], video: 'https://c.tenor.com/jm6GUnNRbEcAAAAd/tenor.gif' },
        { name: 'Extensión con mancuernas', variations: ['de pie', 'sentado'], video: 'https://c.tenor.com/V_ypUCAmBUgAAAAd/tenor.gif' },
        { name: 'Patada de tríceps', variations: ['con mancuernas'], video: 'https://c.tenor.com/UchKCbffFNEAAAAd/tenor.gif' },
        { name: 'Fondos entre bancos', variations: [], video: 'https://c.tenor.com/6zLmQ1C_33YAAAAd/tenor.gif' },
        { name: 'Extensión de tríceps en polea', variations: ['con cuerda', 'con barra'], video: 'https://c.tenor.com/Kj3K10KHPGgAAAAd/tenor.gif' },
        { name: 'Rompecráneos', variations: ['con barra', 'con mancuernas'], video: 'https://c.tenor.com/y_Z2oZ35sP8AAAAd/tenor.gif' },
        { name: 'Push-ups de tríceps', variations: ['normales', 'con manos juntas'], video: 'https://c.tenor.com/_lw152SU9i8AAAAd/tenor.gif' }
    ],
    cuadriceps: [
        { name: 'Sentadillas', variations: ['libres', 'en Smith', 'con barra', 'con mancuernas'], video: 'https://c.tenor.com/HirviDex-RgAAAAd/tenor.gif' },
        { name: 'Step-up', variations: ['con mancuernas', 'barra'], video: 'https://blog.myfitnesspal.com/wp-content/uploads/2019/07/Dumbbell-step-ups.gif' },
        { name: 'Prensa de pierna 45°', variations: ['unilateral'], video: 'https://c.tenor.com/7injx4goRVQAAAAd/tenor.gif' },
        { name: 'Estocadas', variations: ['con barra', 'mancuernas', 'caminando'], video: 'https://cdn.jefit.com/assets/img/exercises/gifs/136.gif' },
        { name: 'Extensiones de piernas', variations: ['en máquina'], video: 'https://c.tenor.com/oWFSihhh8JgAAAAd/tenor.gif' },
        { name: 'Sentadilla búlgara split', variations: ['con mancuernas', 'barra'], video: 'https://c.tenor.com/5P_Ar_LX0DQAAAAC/tenor.gif' },
        { name: 'Sentadilla frontal', variations: ['con barra', 'en Smith', 'mancuernas'], video: 'https://downloads.ctfassets.net/6ilvqec50fal/3XL8ea3MauyT4lvv33mQUR/f61e8309f5b301009a3f161f80719280/Barbell_Front_Squat_GIF.gif' },
        { name: 'Sentadilla Hack', variations: ['con barra'], video: 'https://c.tenor.com/NDFafSQfq_kAAAAd/tenor.gif' },
        { name: 'Sentadilla profunda', variations: ['con barra'], video: 'https://c.tenor.com/HirviDex-RgAAAAd/tenor.gif' }
    ],
    gluteos: [
        { name: 'Hip Thrust', variations: ['con barra', 'con mancuernas'], video: 'https://i.pinimg.com/originals/64/9f/4c/649f4c63b6753b342fbc148bdfacce82.gif' },
        { name: 'Glute Bridge', variations: ['con barra', 'mancuernas'], video: 'https://static.wixstatic.com/media/2566d7_f74030a463314e73bea9e129567ea451~mv2.gif' },
        { name: 'Sentadillas sumo', variations: ['con barra', 'mancuernas'], video: 'https://c.tenor.com/5z4q0v91sNYAAAAd/tenor.gif' },
        { name: 'Patadas de glúteo', variations: ['con cable'], video: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2022/05/GRT-02.01.CableMachineGluteKickbacks.gif' },
        { name: 'Zancada unilateral', variations: ['con barra', 'mancuernas'], video: 'https://gymbeam.cz/blog/wp-content/uploads/2024/03/Bulharsky-drep-s-dumbbellom.gif' },
        { name: 'Prensa', variations: ['45°', 'unilateral'], video: 'https://c.tenor.com/7injx4goRVQAAAAd/tenor.gif' },
        { name: 'Sentadilla búlgara', variations: ['con mancuernas', 'barra'], video: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/09/barbell-good-morning.gif' },
    ],
    isquiotibiales: [
        { name: 'Curl femoral boca abajo', variations: ['en maquina'], video: 'https://c.tenor.com/YtkG_5GRhjcAAAAd/tenor.gif' },
        { name: 'Peso muerto', variations: ['con barra', 'con mancuernas'], video: 'https://c.tenor.com/NgtmNzYYAzYAAAAd/tenor.gif' },
        { name: 'Peso muerto unilateral', variations: ['con mancuernas'], video: 'https://www.kettlebellkings.com/cdn/shop/articles/single_leg_deadlift.gif?v=1714643736' },
        { name: 'Zancadas', variations: ['caminando', 'con barra', 'mancuernas'], video: 'https://cdn.jefit.com/assets/img/exercises/gifs/136.gif' },
        { name: 'Puente posterior', variations: ['elevacion de pierna'], video: 'https://www.hsnstore.com/blog/wp-content/uploads/2023/03/puente-1-pierna.gif' },
        { name: 'Peso muerto rumano', variations: ['con barra', 'mancuernas'], video: 'https://fitcron.com/wp-content/uploads/2021/04/00851301-Barbell-Romanian-Deadlift_Hips_720.gif' }
    ],
    pantorrillas: [
        { name: 'Elevación de talones de pie', variations: ['con barra', 'con mancuernas', 'a una pierna'], video: 'https://c.tenor.com/luHnzcc-PHoAAAAd/tenor.gif' },
        { name: 'Elevación de talones sentado', variations: ['con mancuernas', 'en máquina', 'en prensa'], video: 'https://c.tenor.com/dE7yo5T973EAAAAd/tenor.gif' },
    ]
};

export default gymExercises;