
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"

import {
     Carousel,
     CarouselContent,
     CarouselItem,
     CarouselNext,
     CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"



export default function SpecialDialog() {
     return (
          <Dialog>
               <DialogTrigger asChild>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                         Đề Special
                    </Button>
               </DialogTrigger>

               <DialogContent className="max-w-lg">

                    <DialogHeader>
                         <DialogTitle>Đề qq chứ ko có gì Special </DialogTitle>
                    </DialogHeader>

                    <Carousel className="w-full mt-4">

                         <CarouselContent>


                              <CarouselItem >

                                   <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-lg font-semibold">
                                        Haizz!! Chấp niệm sâu thế
                                   </div>

                              </CarouselItem>
                              <CarouselItem >

                                   <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-lg font-semibold">
                                        Không có đề đâu bạn ơi!
                                   </div>

                              </CarouselItem>
                              <CarouselItem >

                                   <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-lg font-semibold">
                                        <img src="https://images.squarespace-cdn.com/content/61da6bc18e4e00423cffe684/10c45d50-f281-4a3a-b846-bbbcd5fb9210/Ma+Tieu+Da.png?format=1500w&content-type=image%2Fpng"/>
                                   </div>

                              </CarouselItem>
                              <CarouselItem >

                                   <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-lg font-semibold">
                                     <audio controls className="w-full">
      <source src="/public/kkk.mp3"type="audio/mpeg" />
    </audio>   
                                   </div>

                              </CarouselItem>
                              
                              <CarouselItem >

                                   <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-lg font-semibold">
                                    Hết rồi!  Thi tốt nha, cố lên! :{"))))))"}
                                   </div>

                              </CarouselItem>

                         </CarouselContent>

                         <CarouselPrevious />
                         <CarouselNext />

                    </Carousel>

               </DialogContent>
          </Dialog>
     )
}
