import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book{

@Prop({ required: true })
title:string;

@Prop()
description?:string;

@Prop({ required: true })
author:string;

@Prop({ required: true })
pages:Number;

}

export const BookSchema= SchemaFactory.createForClass(Book);