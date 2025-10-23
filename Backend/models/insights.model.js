import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const insightsSchema = new Schema({
  user: { type: ObjectId, ref: 'Users', required: true },
  type: String,
  data: Object,
  generatedAt: { type: Date, default: Date.now }
});

const InsightsModel = mongoose.model("Insights", insightsSchema);
export default InsightsModel;
