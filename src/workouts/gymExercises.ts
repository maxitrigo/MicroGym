const gymExercises = {
    pecho: [
        { name: 'Press de banca, agarre cerrado', variations: ['barra'], video: 'https://c.tenor.com/vsNKHqAvOKoAAAAd/tenor.gif' },
        { name: 'Press de banca, agarre amplio', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/vsNKHqAvOKoAAAAd/tenor.gif' },
        { name: 'Aperturas con mancuernas', variations: ['planas', 'inclinadas'], video: 'https://c.tenor.com/aeiQWNFbCL8AAAAd/tenor.gif' },
        { name: 'Press inclinado', variations: ['barra', 'mancuernas'], video: 'https://c.tenor.com/2PdWlCSxHh4AAAAd/tenor.gif' },
        { name: 'Flexiones', variations: ['normales', 'diamante', 'arquero'], video: 'https://c.tenor.com/p5VGilBlRKIAAAAd/tenor.gif' },
        { name: 'Hex Press', variations: ['mancuernas'], video: 'https://c.tenor.com/Vhhf9PFyFSwAAAAd/tenor.gif' },
        { name: 'Pull-over', variations: ['mancuernas', 'polea'], video: 'https://c.tenor.com/iKKHtdZ2QwUAAAAd/tenor.gif' },
        { name: 'Fondos en paralelas', variations: [], video: 'https://c.tenor.com/7qFqk839s9wAAAAd/tenor.gif' },
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
        { name: 'Press militar', variations: ['barra', 'mancuernas'] },
        { name: 'Vuelos laterales', variations: ['con mancuernas', 'con cable'] },
        { name: 'Vuelos frontales', variations: ['mancuernas', 'barra'] },
        { name: 'Vuelos posteriores', variations: ['mancuernas', 'con cable'] },
        { name: 'Arnold Press', variations: [] },
        { name: 'Remo al menton', variations: ['con barra', 'con mancuernas'] },
        { name: 'Push press', variations: [] },
        { name: 'Press trasnuca en Smith', variations: [] },
        { name: 'Press en Smith', variations: [] },
        { name: 'Press frontal', variations: ['mancuernas'] }
    ],
    biceps: [
        { name: 'Curl con barra', variations: ['recta', 'W'] },
        { name: 'Curl concentrado', variations: [] },
        { name: 'Curl con mancuernas', variations: ['alterno', 'simultáneo'] },
        { name: 'Curl de bíceps en Scott', variations: ['barra recta', 'barra W'] },
        { name: 'Curl en banco inclinado', variations: ['unilateral'] },
        { name: 'Curl martillo', variations: ['con mancuernas', 'con cuerda'] },
        { name: 'Curl en máquina', variations: [] },
        { name: 'Curl invertido (pecho apoyado en banco)', variations: ['con barra', 'con mancuernas'] },
        { name: 'Curl con banda elástica', variations: [] },
        { name: 'Curl con polea', variations: ['alta', 'baja'] },
    ],
    triceps: [
        { name: 'Fondos en paralelas', variations: ['normales', 'con peso'] },
        { name: 'Extensiones de tríceps en polea', variations: ['con cuerda', 'barra'] },
        { name: 'Press de banca agarre cerrado', variations: [] },
        { name: 'Extensión con mancuernas', variations: ['de pie', 'acostado'] },
        { name: 'Patada de tríceps', variations: ['con mancuernas', 'con cuerda'] },
        { name: 'Fondos entre bancos', variations: [] },
        { name: 'Press en máquina de tríceps', variations: [] },
        { name: 'Extensión de tríceps en banco', variations: [] },
        { name: 'Rompecráneos', variations: ['con barra', 'con mancuernas'] },
        { name: 'Push-ups de tríceps', variations: ['normales', 'con manos juntas'] }
    ],
    cuadriceps: [
        { name: 'Sentadillas', variations: ['libres', 'en Smith', 'con barra', 'con mancuernas'] },
        { name: 'Step-up', variations: ['con mancuernas', 'barra'] },
        { name: 'Prensa de pierna', variations: ['45°', 'unilateral'] },
        { name: 'Estocadas', variations: ['con barra', 'mancuernas', 'caminando'] },
        { name: 'Extensiones de piernas', variations: ['en máquina'] },
        { name: 'Sentadilla búlgara', variations: ['con mancuernas', 'barra'] },
        { name: 'Sentadilla frontal', variations: ['con barra', 'en Smith'] },
        { name: 'Sentadillas sumo', variations: ['con barra', 'mancuernas'] },
        { name: 'Sentadilla Hack', variations: ['con barra'] },
        { name: 'Sentadilla profunda', variations: ['con barra'] }
    ],
    gluteos: [
        { name: 'Hip Thrust', variations: ['con barra', 'con mancuernas'] },
        { name: 'Elevaciones de cadera en banco', variations: [] },
        { name: 'Glute Bridge', variations: ['con barra', 'mancuernas'] },
        { name: 'Sentadilla sumo', variations: ['con barra', 'mancuernas'] },
        { name: 'Patadas de glúteo', variations: ['con cable', 'mancuernas'] },
        { name: 'Zancada unilateral', variations: ['con barra', 'mancuernas'] },
        { name: 'Prensa', variations: ['45°', 'unilateral'] },
        { name: 'Extensiones de cadera', variations: ['con máquina'] },
        { name: 'Puentes de glúteos con banda elástica', variations: [] },
        { name: 'Sentadilla búlgara', variations: ['con mancuernas'] }
    ],
    isquiotibiales: [
        { name: 'Curl femoral boca abajo', variations: ['en maquina'] },
        { name: 'Peso muerto', variations: ['con barra', 'con mancuernas'] },
        { name: 'Peso muerto unilateral', variations: ['con mancuernas', 'barra'] },
        { name: 'Extencion de espalda', variations: ['en maquina'] },
        { name: 'Zancadas', variations: ['caminando', 'con barra', 'mancuernas'] },
        { name: 'Puente posterior', variations: ['elevacion de pierna'] },
        { name: 'Peso muerto rumano', variations: ['con barra', 'mancuernas'] }
    ],
    pantorrillas: [
        { name: 'Elevación de talones de pie', variations: ['con barra', 'con mancuernas', 'a una pierna'] },
        { name: 'Elevación de talones sentado', variations: ['con mancuernas', 'en máquina', 'en prensa'] },
    ]
};

export default gymExercises;