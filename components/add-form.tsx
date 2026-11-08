"use client"
import { SyntheticEvent, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { MockProductDetails, ProductDetail } from '@/util/data/models/product-detail';

interface ChildProperties {
    onSendData: (data: boolean) => void;
}



export default function AddModal({onSendData}: ChildProperties) {
const [formData, setFormData] = useState();

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
}

async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setFormData(details => ({
        purchaseDetailItemAutoId: MockProductDetails.length +1,
        ...details,
        lastModifiedByUser: 'system',
        
    }));
    console.log(formData);
    let newProductDetail:ProductDetail = formData;
    newProductDetail.purchaseDetailItemAutoId = ++MockProductDetails.length;
    newProductDetail.lastModifiedByUser = 'system';
    newProductDetail.lastModifiedDateTime = new Date().toISOString().replace('Z', '');
    MockProductDetails.push(newProductDetail);

    onSendData(false);
}

async function handleClose(e: SyntheticEvent) {
    e.preventDefault();
    onSendData(false);
}

return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Add Product Detail</h3>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="mt-2 px-7 py-3">
                            <div className="text-lg">
                                <div>
                                    <Label htmlFor="purchaseOrderNumber" className="text-gray-700 mt-3 font-bold">
                                        Purchase Order #
                                    </Label>
                                    <Input
                                        id="purchaseOrderNumber"
                                        name="purchaseOrderNumber"
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="lineNumber" className="text-gray-700 mt-3 font-bold">
                                        Line #
                                    </Label>
                                    <Input
                                        id="lineNumber"
                                        name="lineNumber"
                                        type="number"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="itemNumber" className="text-gray-700 mt-3 font-bold">
                                        Item Number
                                    </Label>
                                    <Input
                                        id="itemNumber"
                                        name="itemNumber"
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="itemName" className="text-gray-700 mt-3 font-bold">
                                        Item Name
                                    </Label>
                                    <Input
                                        id="itemName"
                                        name="itemName"
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="itemDescription" className="text-gray-700 mt-3 font-bold">
                                        Item Description
                                    </Label>
                                    <Input
                                        id="itemDescription"
                                        name="itemDescription"
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="purchasePrice" className="text-gray-700 mt-3 font-bold">
                                        Purchase Price
                                    </Label>
                                    <Input
                                        id="purchasePrice"
                                        name="purchasePrice"
                                        type="number"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                                    <div>
                                    <Label htmlFor="purchaseQuantity" className="text-gray-700 mt-3 font-bold">
                                        Purchase Quantity
                                    </Label>
                                    <Input
                                        id="purchaseQuantity"
                                        name="purchaseQuantity"
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                    </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button
                            onClick={handleSubmit}
                            className="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">Add Record</Button>
                            
                            <Button
                            onClick={handleClose}
                            className="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                            Close
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

        );  
}