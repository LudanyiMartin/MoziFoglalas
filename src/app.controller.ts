import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { NewReserveDto } from 'src/NewReserveDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  
  @Get('foglalas')
  @Render('foglalas')
  getFoglalas(){
    return{
      
      errors: [],
      data: []
    }
  }

  @Post('foglalas')
  newFoglalas(
    @Body() reserveData: NewReserveDto,
    @Res() response: Response
  ){
    const toDate = new Date();
    const errors: string[] = [];
    if(!reserveData.nev || !reserveData.email || !reserveData.datum || !reserveData.nezok){
      errors.push("Nincs megadva minden mező!");
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserveData.email)){
      errors.push("Az email helytelenül van megadva!")
    }
    if(new Date(reserveData.datum).getTime() < toDate.getTime()){
      errors.push("A dátum helytelen!")
    }
    if(reserveData.nezok < 1 || reserveData.nezok > 10){
      errors.push("A nézők számának 1 és 10 között kell lennie!")
    }
    if(errors.length > 0){
      response.render('foglalas', {
        errors,
        data: reserveData
      })
    }
    response.redirect(303, 'success')
  }

  @Get('success')
  @Render('success')
  successFoglalas(){
    
  }
}
