import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkflow extends Document {
  userId: string;
  name: string;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkflowSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true, default: "Untitled Workflow" },
  nodes: { type: [Schema.Types.Mixed], default: [] },
  edges: { type: [Schema.Types.Mixed], default: [] },
}, {
  timestamps: true
});

export const Workflow: Model<IWorkflow> = mongoose.models.Workflow || mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
