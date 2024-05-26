"use client"

import Chart from "@/components/Chart/Chart"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


export default function ChartPage() {
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full">
                        <DrawerHeader className="my-10">
                            <DrawerTitle>Your chart</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 pb-0 justify-center">
                            <div className="mt-3 h-[300px] w-2/3"> {/* Increased height to 300px */}
                                <Chart />
                            </div>
                        </div>
                        <DrawerFooter className="my-10">
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}