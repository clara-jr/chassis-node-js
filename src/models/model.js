import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const ModelSchema = new Schema({
	index: { type: ObjectId, unique: true, required: true, index: true },
	sparseIndex: { type: String, sparse: true },
	string: String,
	number: Number,
	boolean: Boolean,
	date: Date,
	stringsArray: [String],
	objectsArray: [{ string: String, date: Date, _id: false }],
	embedded: {
		string: String,
		number: Number
	},
	object: { type: Object },
	default: { type: String, default: 'default' },
	lang: {
		type: String,
		validate: {
			validator: (value) => ['en', 'es', 'fr'].includes(value),
			message: (props) => `'${props.value}' is not a valid value for 'lang' field.`,
		},
		default: 'en',
		lowercase: true,
	},
	languages: {
		type: [String],
		validate: {
			validator: (value) => value.every((lang) => ['en', 'es', 'fr'].includes(lang)),
			message: (props) => `'${props.value}' is not a valid value for 'languages' field.`,
		},
		default: ['en'],
	},
});

const Model = model('Model', ModelSchema, 'models');

export default Model;
