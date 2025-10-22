import Address from '@/components/shopping-cart/Address'
import Orders from '@/components/shopping-cart/Orders'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

function Account() {
    return (
        <div className='flex flex-col'><div className='relative h-[350px] w-full overflow-hidden'>
            <img
                src="https://cdn.pixabay.com/photo/2019/10/10/08/11/shopping-4538982_1280.jpg" alt="account" className='h-full w-full object-fill overflow-hidden' />
        </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-md'>
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">
                                Orders
                            </TabsTrigger>
                            <TabsTrigger value="address">
                                Address
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <Orders />
                        </TabsContent>
                        <TabsContent value="address">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Account