import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type UserDocument = HydratedDocument<User>;


@Schema({
    timestamps: true
})
export class User {

  @Prop({
    required:true,
    unique:true,

  })
  email: string;


  @Prop({
    required:false,
  })
  fullName?: string;

  @Prop({
    required:false,
  })
  isVerified?: boolean;

  @Prop({
    required:true,
  })
  password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);