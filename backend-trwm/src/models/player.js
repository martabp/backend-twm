const mongoose = require('mongoose');

// Subdocumento de geolocalización
const geolocationSchema = new mongoose.Schema({
    latitud: {
        type: Number,
        required: [true, 'La latitud es obligatoria'],
        min: [-90, 'La latitud mínima es -90'],
        max: [90, 'La latitud máxima es 90']
    },
    longitud: {
        type: Number,
        required: [true, 'La longitud es obligatoria'],
        min: [-180, 'La longitud mínima es -180'],
        max: [180, 'La longitud máxima es 180']
    }
});

// Subdocumento de comentario
const commentSchema = new mongoose.Schema({
    autor: {
        type: String,
        required: [true, 'El autor del comentario es obligatorio'],
        trim: true,
        minlength: [2, 'El autor debe tener al menos 2 caracteres']
    },
    comentario: {
        type: String,
        required: [true, 'El comentario es obligatorio'],
        trim: true,
        maxlength: [1000, 'El comentario no puede superar los 1000 caracteres']
    },
    valoracion: {
        type: Number,
        required: [true, 'La valoración es obligatoria'],
        min: [0, 'La valoración mínima es 0'],
        max: [5, 'La valoración máxima es 5']
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    geolocalizacion: {
        type: geolocationSchema,
        required: [true, 'La geolocalización del comentario es obligatoria']
    }
});

// Esquema principal de jugador
const playerSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del jugador es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },
    equipo: {
        type: String,
        required: [true, 'El equipo es obligatorio'],
        trim: true,
        minlength: [2, 'El equipo debe tener al menos 2 caracteres'],
        maxlength: [100, 'El equipo no puede superar los 100 caracteres']
    },
    liga: {
        type: String,
        required: [true, 'La liga es obligatoria'],
        trim: true,
        minlength: [2, 'La liga debe tener al menos 2 caracteres'],
        maxlength: [100, 'La liga no puede superar los 100 caracteres']
    },
    nacionalidad: {
        type: String,
        trim: true,
        maxlength: [80, 'La nacionalidad no puede superar los 80 caracteres']
    },
    edad: {
        type: Number,
        min: [15, 'La edad mínima permitida es 15'],
        max: [50, 'La edad máxima permitida es 50']
    },
    posicion: {
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    origen: {
        type: String,
        enum: {
            values: ['MANUAL', 'API_FOOTBALL'],
            message: 'El origen debe ser MANUAL o API_FOOTBALL'
        }
    },
    geolocalizacion: {
        type: geolocationSchema
    },
    comentarios: {
        type: [commentSchema],
        default: []
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Player', playerSchema);