import { useState, useEffect } from 'react';
import Menupage from '../menupage';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditProductPage() {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [product_name, setProductName] = useState("");
    const [product_width, setWidth] = useState("");
    const [product_length, setLength] = useState("");
    const [product_height, setHeight] = useState("");
    const [product_weight, setWeight] = useState("");
    const [product_amount, setAmount] = useState("");
    const [product_cost, setCost] = useState("");
    const [user_id, setUserId] = useState("");

    console.log(product_id)
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${product_id}`);
                const data = await response.json();

                // ตรวจสอบข้อมูลที่ได้รับ
                console.log("Fetched data:", data.products[0].product_name);
                if (data && data.products) {
                    setProductName(data.products[0].product_name || ""); // อัปเดตชื่อสินค้า
                    setWidth(data.products[0].product_width || ""); // อัปเดตความกว้าง
                    setLength(data.products[0].product_length || ""); // อัปเดตความยาว  
                    setHeight(data.products[0].product_height || ""); // อัปเดตความสูง
                    setWeight(data.products[0].product_weight || ""); // อัปเดตน้ำหนัก
                    setAmount(data.products[0].product_amount || ""); // อัปเดตจำนวน
                    setCost(data.products[0].product_cost || ""); // อัปเดตจำนวน
                    setUserId(data.products[0].user_id || ""); // อัปเดตจำนวน
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchOrder(); // เรียกใช้ฟังก์ชันเมื่อ component โหลด
    }, [product_id]);
    console.log(product_name)
    // ฟังก์ชันสำหรับจัดการการแก้ไขรายการ
    const handleEditItem = async () => {
        const updatedItem = {
            product_name,
            product_width: parseFloat(product_width),
            product_length: parseFloat(product_length),
            product_height: parseFloat(product_height),
            product_weight: parseFloat(product_weight),
            product_amount: parseInt(product_amount),
            product_cost: parseFloat(product_cost),
            user_id: parseInt(user_id)
        };
        console.log(product_name)
        try {
            const response = await fetch(`http://localhost:8080/api/products/${product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                navigate('/Product'); // นำทางไปยังหน้าผลลัพธ์เมื่อสำเร็จ
            } else {
                console.error('Error updating item:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="grid grid-cols-12 h-screen">
            <Menupage />
            <div className="col-span-10">
                <div className='flex justify-center items-center h-screen'>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <div className="card-title grid justify-center">
                                <h2>แก้ไขรายระเอียด</h2>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <label className="form-control w-full max-w-xs col-span-2">
                                    <span className="label-text">ชื่อสินค้า</span>
                                    <input
                                        type="text"
                                        placeholder="ชื่อสินค้า"
                                        value={product_name} // แสดงชื่อสินค้าที่ดึงมา
                                        onChange={(e) => setProductName(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">ความกว้าง</span>
                                    <input
                                        type="text"
                                        placeholder="เซนติเมตร"
                                        value={product_width} // แสดงความกว้างที่ดึงมา
                                        onChange={(e) => setWidth(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">ความยาว</span>
                                    <input
                                        type="text"
                                        placeholder="เซนติเมตร"
                                        value={product_length} // แสดงความยาวที่ดึงมา
                                        onChange={(e) => setLength(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">ความสูง</span>
                                    <input
                                        type="text"
                                        placeholder="เซนติเมตร"
                                        value={product_height} // แสดงความสูงที่ดึงมา
                                        onChange={(e) => setHeight(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">น้ำหนัก</span>
                                    <input
                                        type="text"
                                        placeholder="น้ำหนัก"
                                        value={product_weight} // แสดงน้ำหนักที่ดึงมา
                                        onChange={(e) => setWeight(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">ราคา</span>
                                    <input
                                        type="text"
                                        placeholder="บาท"
                                        value={product_cost}
                                        onChange={(e) => setCost(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">จำนวน</span>
                                    <input
                                        type="text"
                                        placeholder="จำนวน"
                                        value={product_amount} // แสดงจำนวนที่ดึงมา
                                        onChange={(e) => setAmount(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <span className="label-text">ผู้ใช้</span>
                                    <input
                                        type="text"
                                        placeholder="userid"
                                        value={user_id}
                                        onChange={(e) => setUserId(e.target.value)} // อัปเดต state
                                        className="input input-bordered input-sm w-full max-w-xs" />
                                </label>
                            </div>
                            <div className="card-actions justify-center">
                                <button onClick={handleEditItem} className="btn bg-green-500 btn-sm">Save</button>
                                <Link to='/Product'>
                                    <button className="btn btn-error btn-sm">Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProductPage;
