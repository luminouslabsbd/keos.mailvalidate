import React, { useState, useEffect } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Physical() {
    const { categories, sub_categories, brands, type, colors, sizes, units } =
        usePage().props;

    const [selectedColorOptions, setSelectedColorOptions] = useState([]);
    const [selectedSizeOptions, setSelectedSizeOptions] = useState([]);
    const [attributesLength, setAttributesLength] = useState([]);
    const [hiddenAttributesLength, setHiddenAttributesLength] = useState([]);
    const [IsproductVariationValue, setProductVariationValue] = useState(false);
    console.log("🚀 ~ Physical ~ IsproductVariationValue:", IsproductVariationValue)
    console.log(hiddenAttributesLength)

    useEffect(() => {
        const generateInputValues = () => {
            const inputValues = [];
            const hiddenValues = [];

            selectedSizeOptions.forEach((sizeOption) => {

                selectedColorOptions.forEach((colorOption) => {
                    const inputValue = `${sizeOption.label}/${colorOption.label}`;
                    const hiddenValue = `${sizeOption.value}/${colorOption.value}`;
                    inputValues.push(inputValue);
                    hiddenValues.push(hiddenValue);
                });
            });

            setAttributesLength(inputValues);
            setHiddenAttributesLength(hiddenValues);
        };

        generateInputValues();
    }, [selectedColorOptions, selectedSizeOptions]);


    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            type: type,
        },
    });
    const product_description = watch("product_description", "");
    const handleQuillChange = (value) => {
        setValue("product_description", value);
    };

    const product_buy_return_policy = watch("product_buy_return_policy", "");
    const productBuyReturnPolicy = (value) => {
        setValue("product_buy_return_policy", value);
    };

    const categoruOptions = categories.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));
    const unitOptions = units.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));
    const subCategoruOptions = sub_categories.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));
    const brandOptions = brands.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));

    const colorsOption = colors.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));
    const sizeOptions = sizes.map((item) => ({
        value: item?.id,
        label: item?.name ? `${item.name}` : "",
    }));
    const handleSelectCategory = (selectedOption) => {
        setValue("category_id", selectedOption?.value);
    };
    const handleSelectSubCategory = (selectedOption) => {
        setValue("sub_category_id", selectedOption?.value);
    };
    const handleSelectBrand = (selectedOption) => {
        setValue("brand_id", selectedOption?.value);
    };
    const handleSelectUnit = (selectedOption) => {
        setValue("unit_id", selectedOption?.value);
    };
    const productVariationValue = (event) => {
        const value = event.target.value;
        if (value === "1") {
            setProductVariationValue(false);
        }
        if (value === "2") {
            setProductVariationValue(true);
        }
    };

    const [isProductConditionAllowed, setProductConditionAllowed] =
        useState(false);

    const allowProductCondition = (e) => {
        // Update the state when the checkbox is clicked
        setProductConditionAllowed(e.target.checked);
    };

    const [isProductPreorderAllowed, setProductPreorderAllowed] =
        useState(false);

    const allowProductPreOrder = (e) => {
        // Update the state when the checkbox is clicked
        setProductPreorderAllowed(e.target.checked);
    };

    const [isProductWholeSaleAllow, setProductWholeSaleAllow] = useState(false);

    const allowWholeSaleProduct = (e) => {
        // Update the state when the checkbox is clicked
        setProductWholeSaleAllow(e.target.checked);
    };
    const [items, setItems] = useState([]);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length
            ? items.reduce(
                (max, character) => (character.id > max ? character.id : max),
                items[0].id
            )
            : 0;

        setItems([...items, { id: maxId + 1, quantity: "1", discount: 0 }]);
    };

    const removeItem = (item = null) => {
        setItems(items.filter((d) => d.id !== item.id));
    };

    const changeQuantityDiscount = (type, value, id) => {
        const list = items;
        const item = list.find((d) => d.id === id);
        if (type === "quantity") {
            item.quantity = Number(value);
        }
        if (type === "discount") {
            item.discount = Number(value);
        }
        setItems([...list]);
    };

    function onSubmit(data) {
        const total_items = items;
        const newData = {
            ...data,
            items: total_items,
        };
        router.post("/admin/product/physical/store", newData);
        // console.log(newData);
    }
    return (
        <>
        <div className="grid grid-cols-12">
        <div className="col-span-1 pt-4"></div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 col-span-10">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                    >
                        <path
                            d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path
                            opacity="0.5"
                            d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="#" className="text-primary hover:underline">
                           Physical
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Add</span>
                    </li>
                </ul>
            </div>
            <div className="col-span-1 pt-4"></div>
        </div>

            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="col-span-1 pt-4"></div>
                    <div className="col-span-7 pt-4">
                        <div className="">
                            <div className="panel">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Basic
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label>Category</label>
                                            <Controller
                                                control={control}
                                                name="category_id"
                                                render={({ field }) => (
                                                    <Select
                                                        placeholder="Select an option"
                                                        options={categoruOptions}
                                                        value={categoruOptions.find(
                                                            (option) =>
                                                                option.value ===
                                                                field.value
                                                        )}
                                                        onChange={handleSelectCategory}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <label>Sub Category</label>
                                            <Controller
                                                control={control}
                                                name="sub_category_id"
                                                render={({ field }) => (
                                                    <Select
                                                        placeholder="Select an option"
                                                        options={subCategoruOptions}
                                                        value={subCategoruOptions.find(
                                                            (option) =>
                                                                option.value ===
                                                                field.value
                                                        )}
                                                        onChange={
                                                            handleSelectSubCategory
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input {...register("type")} type="hidden" />
                                        <div>
                                            <label>Brand</label>
                                            <Controller
                                                control={control}
                                                name="brand_id"
                                                render={({ field }) => (
                                                    <Select
                                                        placeholder="Select an option"
                                                        options={brandOptions}
                                                        value={brandOptions.find((option) => option.value === field.value)}
                                                        onChange={handleSelectBrand}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <label>Unit</label>
                                            <Controller
                                                control={control}
                                                name="unit_id"
                                                render={({ field }) => (
                                                    <Select
                                                        placeholder="Select an option"
                                                        options={unitOptions}
                                                        value={unitOptions.find(
                                                            (option) =>
                                                                option.value ===
                                                                field.value
                                                        )}
                                                        onChange={handleSelectUnit}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label>Select Product Variation</label>

                                            <select
                                                className="form-select text-white-dark"
                                                {...register("product_variation")}
                                                onChange={productVariationValue}
                                            >
                                                <option value="1">Single Product</option>
                                                <option value="2">Variation Product</option>
                                            </select>
                                            {errors?.product_variation && (
                                                <p className="text-red-600 pt-2">
                                                    {errors?.product_variation}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label> Product SKU </label>
                                            <input
                                                {...register("product_sku", {
                                                    required: "Product SKU Is required",
                                                })}
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter Product Name"
                                            />
                                            {errors.product_sku && (
                                                <p className="text-red-600 pt-2">
                                                    {errors.product_sku.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <label>Product Name </label>
                                            <input
                                                {...register("product_name", {required:"Product Name Is required",})}
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter Product Name"
                                            />
                                            {errors.product_name && (
                                                <p className="text-red-600 pt-2">
                                                    {errors.product_name.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel mt-4">
                                {IsproductVariationValue === true ? (
                                    <>
                                        <div className="flex items-center justify-between mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">
                                                Atrribute
                                            </h5>
                                        </div>
                                        <div className="mb-5 space-y-5 relative">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label>Color<span className="text-red-600 ">*</span></label>
                                                    <div className="flex items-center gap-2">
                                                        <Controller
                                                            control={control}
                                                            {...register("color_id")}
                                                            render={({ field }) => (
                                                                <Select
                                                                    className="w-full"
                                                                    placeholder="Select an option"
                                                                    options={colorsOption}
                                                                    isMulti
                                                                    isSearchable={true}
                                                                    value={Array.isArray(field.value) ? colorsOption.filter((option) => field.value.includes(option.value)): []}
                                                                    onChange={(selectedOptions) => { field.onChange(selectedOptions.map((option) => option.value));
                                                                    setSelectedColorOptions(selectedOptions); // Assuming setSelectedColorOptions is declared elsewhere
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label>Size<span className="text-red-600 ">*</span></label>
                                                    <div className="flex items-center gap-2">
                                                        <Controller
                                                            control={control}
                                                            {...register("size_id")}
                                                            render={({ field }) => (
                                                                <Select
                                                                    className="w-full"
                                                                    placeholder="Select an option"
                                                                    options={sizeOptions}
                                                                    isMulti
                                                                    isSearchable={true}
                                                                    value={Array.isArray(field.value) ? sizeOptions.filter((option) => field.value.includes(option.value)): []}
                                                                    onChange={(selectedOptions) => { console.log(selectedOptions );
                                                                        field.onChange(selectedOptions.map((option) => option.value));
                                                                        setSelectedSizeOptions(selectedOptions); // Assuming setSelectedColorOptions is declared elsewhere
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">
                                                Product Price and Description
                                            </h5>
                                        </div>

                                        <div className="mb-5 space-y-5 relative">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label>Price</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            {...register(
                                                                "single_product_price",
                                                                {
                                                                    required:
                                                                        "Product Name Is required",
                                                                }
                                                            )}
                                                            type="number"
                                                            className="form-input"
                                                            placeholder="99$"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label>Discount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            {...register(
                                                                "single_product_discount",
                                                                {
                                                                    required:
                                                                        "Product Name Is required",
                                                                }
                                                            )}
                                                            type="number"
                                                            className="form-input"
                                                            placeholder="10%"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label>Quantity</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            {...register(
                                                                "single_product_quantity",
                                                                {
                                                                    required:
                                                                        "Product Quantoty Is required",
                                                                }
                                                            )}
                                                            type="number"
                                                            className="form-input"
                                                            placeholder="50"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            {IsproductVariationValue === true && (
                                <>
                                    {hiddenAttributesLength.length > 0 &&
                                        hiddenAttributesLength.map((item, index) => (
                                            <input
                                                key={index} // Provide a unique key for each input
                                                {...register(
                                                    `product_attribute_${index}`,
                                                    {
                                                        required:
                                                            "Product SKU Is required",
                                                    }
                                                )}
                                                type="hidden"
                                                value={item} // Display the value from the hiddenAttributesLength array
                                            />
                                        ))}
                                    {attributesLength.length > 0 && (
                                        <div className="panel">
                                            <div className="flex items-center justify-between mb-5">
                                                <h5 className="font-semibold text-lg dark:text-white-light">
                                                    Attribute Variation
                                                </h5>
                                            </div>
                                            <div className="mb-5 space-y-5 relative">
                                                {attributesLength.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                                                    >
                                                        <div>
                                                            <label>
                                                                {" "}
                                                                Product attribute{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                value={item} // Set the value here
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>
                                                                {" "}
                                                                Product Price{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                {...register(
                                                                    `product_price_${index}`,
                                                                    {
                                                                        required:
                                                                            "Product Price Is required",
                                                                    }
                                                                )}
                                                                type="number"
                                                                className="form-input"
                                                                placeholder="10$"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>
                                                                {" "}
                                                                Product quantity{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                {...register(
                                                                    `product_quantity_${index}`,
                                                                    {
                                                                        required:
                                                                            "Product quantity Is required",
                                                                    }
                                                                )}
                                                                type="number"
                                                                className="form-input"
                                                                placeholder="5"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>
                                                                {" "}
                                                                Product discount{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                {...register(
                                                                    `product_discount_${index}`,
                                                                    {
                                                                        required:
                                                                            "Product discount Is required",
                                                                    }
                                                                )}
                                                                type="number"
                                                                className="form-input"
                                                                placeholder="8%"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div>
                            <div className="panel mt-4">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Product Description
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <ReactQuill
                                                value={product_description}
                                                onChange={(value) =>
                                                    handleQuillChange(value)
                                                }
                                                theme="snow"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel mt-4">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Product Buy Return Policy
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <ReactQuill
                                                value={product_buy_return_policy}
                                                onChange={(value) =>
                                                    productBuyReturnPolicy(value)
                                                }
                                                theme="snow"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="panel mt-4">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Product Description
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <label className="inline-flex">
                                                <input
                                                    {...register(
                                                        "allow_product_condition"
                                                    )}
                                                    type="checkbox"
                                                    className="form-checkbox text-dark rounded-full"
                                                    onChange={allowProductCondition}
                                                />
                                                <span> Allow Product Condition</span>
                                            </label>
                                        </div>
                                        {isProductConditionAllowed && (
                                            <div>
                                                <select
                                                    className="form-select text-white-dark"
                                                    {...register("product_condition")}
                                                >
                                                    <option value="1">New</option>
                                                    <option value="2">Used</option>
                                                </select>
                                            </div>
                                        )}
                                        <div>
                                            <label className="inline-flex">
                                                <input
                                                    {...register(
                                                        "allow_product_preorder"
                                                    )}
                                                    type="checkbox"
                                                    className="form-checkbox text-dark rounded-full"
                                                    onChange={allowProductPreOrder}
                                                />
                                                <span> Allow Product Preorder</span>
                                            </label>
                                        </div>
                                        {isProductPreorderAllowed && (
                                            <div>
                                                <select
                                                    className="form-select text-white-dark"
                                                    {...register("product_preorder")}
                                                >
                                                    <option value="1">Sale</option>
                                                    <option value="2">Preorder</option>
                                                </select>
                                            </div>
                                        )}

                                        <div>
                                            <label className="inline-flex">
                                                <input
                                                    {...register("allow_whole_sale")}
                                                    type="checkbox"
                                                    className="form-checkbox text-dark rounded-full"
                                                    onChange={allowWholeSaleProduct}
                                                />
                                                <span> Allow Whole Sale</span>
                                            </label>
                                        </div>
                                        {isProductWholeSaleAllow && (
                                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                                <div className="mt-8">
                                                    <div className="table-responsive">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Quantity</th>
                                                                    <th>Discount</th>
                                                                    <th className="w-1"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {items.length <= 0 && (
                                                                    <tr>
                                                                        <td
                                                                            colSpan={5}
                                                                            className="!text-center font-semibold"
                                                                        >
                                                                            No Item
                                                                            Available
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                                {items.map((item) => {
                                                                    return (
                                                                        <tr
                                                                            className="align-top"
                                                                            key={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            <td>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-input w-32"
                                                                                    placeholder="Quantity"
                                                                                    min={
                                                                                        1
                                                                                    }
                                                                                    defaultValue={
                                                                                        item.quantity
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        changeQuantityDiscount(
                                                                                            "quantity",
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </td>

                                                                            <td>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-input w-32"
                                                                                    placeholder="Discount"
                                                                                    min={
                                                                                        0
                                                                                    }
                                                                                    value={
                                                                                        item.discount
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        changeQuantityDiscount(
                                                                                            "discount",
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </td>

                                                                            <td className="mt-2">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        removeItem(
                                                                                            item
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="20"
                                                                                        height="20"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="1.5"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                    >
                                                                                        <line
                                                                                            x1="18"
                                                                                            y1="6"
                                                                                            x2="6"
                                                                                            y2="18"
                                                                                        ></line>
                                                                                        <line
                                                                                            x1="6"
                                                                                            y1="6"
                                                                                            x2="18"
                                                                                            y2="18"
                                                                                        ></line>
                                                                                    </svg>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                                                        <div className="sm:mb-0 mb-6">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    addItem()
                                                                }
                                                            >
                                                                Add Item
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="panel mt-4">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Seo for this product
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <label>Meta Tags</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                {...register("meta_keywords")}
                                                type="text"
                                                className="form-input"
                                                placeholder="pant,shirt,watch,glass"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <label>Meta Description</label>
                                        <div className="flex items-center gap-2">
                                            <textarea
                                                {...register("meta_description")}
                                                className="form-input"
                                                placeholder="Multivendor Ecommerce system"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="panel mt-4">
                                <div className="flex items-center justify-between mb-5">
                                    <h5 className="font-semibold text-lg dark:text-white-light">
                                        Thumbnail
                                    </h5>
                                </div>
                                <div className="mb-5 space-y-5 relative">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <input
                                                type="file"
                                                className="form-input"
                                                {...register("thumbnail")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 pt-4">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">
                                    Thumbnail
                                </h5>
                            </div>
                            <div className="mb-5 space-y-5 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div>
                                        <input
                                            type="file"
                                            className="form-input"
                                            {...register("thumbnail")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 pt-4"></div>
                </div>


                <button type="submit" className="btn btn-primary !mt-6">
                    Submit
                </button>
            </form>
        </>
    );
}

Physical.layout = (page) => (
    <MainLayout children={page} title="Luminous-Ecommerce || Add" />
);

export default Physical;