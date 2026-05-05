const mongoose = require('mongoose');

/**
 * Esquema de equipo.
 * 
 * Este modelo representa un equipo de fútbol dentro de la base de datos.
 * Más adelante se relacionará con los jugadores mediante ObjectId.
 */
const teamSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del equipo es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },
    liga: {
        type: String,
        required: [true, 'La liga del equipo es obligatoria'],
        trim: true,
        minlength: [2, 'La liga debe tener al menos 2 caracteres'],
        maxlength: [100, 'La liga no puede superar los 100 caracteres']
    },
    pais: {
        type: String,
        required: [true, 'El país del equipo es obligatorio'],
        trim: true,
        maxlength: [80, 'El país no puede superar los 80 caracteres']
    },
    estadio: {
        type: String,
        trim: true,
        maxlength: [100, 'El estadio no puede superar los 100 caracteres']
    },
    fundacion: {
        type: Number,
        min: [1800, 'El año de fundación no puede ser menor que 1800'],
        max: [new Date().getFullYear(), 'El año de fundación no puede ser futuro']
    },
    escudo: {
        type: String,
        trim: true
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);