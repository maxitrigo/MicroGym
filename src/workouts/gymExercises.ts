const gymExercises = {
    pecho: [
        { name: 'Press de banca, agarre cerrado', variations: ['barra'] },
        { name: 'Press de banca, agarre amplio', variations: ['barra', 'mancuernas'] },
        { name: 'Aperturas con mancuernas', variations: ['planas', 'inclinadas'] },
        { name: 'Press inclinado', variations: ['barra', 'mancuernas'] },
        { name: 'Flexiones', variations: ['normales', 'diamante', 'arquero'] },
        { name: 'Hex Press', variations: ['mancuernas'] },
        { name: 'Pull-over', variations: ['mancuernas', 'polea'] },
        { name: 'Fondos en paralelas', variations: [] },
        { name: 'Press declinado', variations: ['barra', 'mancuernas'] },
        { name: 'Cruces con polea alta', variations: [] },
        { name: 'Peck Deck', variations: [] }
    ],
    espalda: [
        { name: 'Dominadas', variations: ['agarre supino', 'agarre prono', 'agarre neutro'] },
        { name: 'Remo con barra inclinado', variations: ['agarre prono', 'supino'] },
        { name: 'Remo en máquina', variations: ['unilateral', 'bilateral'] },
        { name: 'Polea al pecho, agarre amplio', variations: ['agarre prono', 'supino'] },
        { name: 'Polea al pecho, agarre cerrado', variations: ['agarre prono', 'supino'] },
        { name: 'Face pulls', variations: ['con cuerda', 'con barra'] },
        { name: 'Remo con mancuernas (serrucho)', variations: ['a una mano'] },
        { name: 'Remo invertido', variations: ['con barra', 'con TRX'] },
        { name: 'Remo en plancha unilateral', variations: ['mancuernas'] }
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