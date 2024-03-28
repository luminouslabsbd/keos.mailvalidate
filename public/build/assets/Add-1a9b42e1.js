import{r as o,j as e,d as m}from"./app-f645d299.js";import p from"./Mainlayout-70fcc997.js";import{u as x}from"./index.esm-9c7427e1.js";import"./ThemeConfig-49c8c6b2.js";import"./Footer-27b42e6f.js";import"./Header-e280dcac.js";import"./Dropdown-eba34fa5.js";import"./nonIterableRest-5e64c36b.js";import"./Sidebar-c3aaab52.js";import"./FlashMessage-60695b58.js";import"./sweetalert2.all-7e1dce6c.js";function h(){const[t,r]=o.useState(!1),n=i=>{const l=i.target.value;l==="1"&&r(!1),l==="2"&&r(!0)},{register:a,handleSubmit:c,setValue:u,reset:j,control:g,formState:{errors:s}}=x();function d(i){console.log(i)}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"panel flex items-center overflow-x-auto whitespace-nowrap p-3 ",children:[e.jsx("div",{className:"rounded-full bg-[#FF6243] p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"h-3.5 w-3.5 text-white",children:[e.jsx("path",{d:"M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{opacity:"0.5",d:"M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),e.jsxs("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e.jsx("li",{children:e.jsx(m,{href:"#",className:"text-[#FF6243] hover:underline text-base",children:"Dashboard"})}),e.jsx("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-base",children:e.jsx("span",{children:"Coupon"})})]})]}),e.jsx("div",{className:"pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6",children:e.jsxs("div",{className:"panel",id:"forms_grid",children:[e.jsx("div",{className:"flex items-center justify-between mb-5",children:e.jsx("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Coupon Add Form"})}),e.jsx("div",{className:"mb-5",children:e.jsxs("form",{className:"space-y-5",onSubmit:c(d),method:"post",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsxs("label",{children:["Coupon Code",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...a("coupon_code",{required:"Coupon Code Is required"}),type:"text",className:"form-input",placeholder:"Enter Color Name"}),s.name&&e.jsx("p",{className:"text-red-600 pt-2",children:s.coupon_code.message})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Start Date"," ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...a("start_date",{required:"Date required"}),type:"date",className:"form-input",placeholder:"Enter Color Name"}),s.name&&e.jsx("p",{className:"text-red-600 pt-2",children:s.name.message})]}),e.jsxs("div",{children:[e.jsxs("label",{children:["End Date",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...a("end_date",{required:"End Date Is required"}),type:"date",className:"form-input",placeholder:"Enter Color Name"}),s.name&&e.jsx("p",{className:"text-red-600 pt-2",children:s.name.message})]})]}),e.jsxs("div",{className:"pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsx("div",{className:"panel",children:e.jsx("div",{className:"mb-5 space-y-5 relative",children:e.jsxs("div",{className:"grid grid-cols-1  gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{children:"Select Coupon Variation Type"}),e.jsxs("select",{className:"form-select text-white-dark",...a("coupon_variation"),children:[e.jsx("option",{value:"1",children:"indivisual"}),e.jsx("option",{value:"2",children:"Category"}),e.jsx("option",{value:"3",children:"Sub-Category"})]}),(s==null?void 0:s.product_variation)&&e.jsx("p",{className:"text-red-600 pt-2",children:s==null?void 0:s.product_variation})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Select Coupon Variation Type"}),e.jsxs("select",{className:"form-select text-white-dark",...a("coupon_variation_type"),children:[e.jsx("option",{value:"1",children:"indivisual"}),e.jsx("option",{value:"2",children:"Category"}),e.jsx("option",{value:"2",children:"Sub-Category"})]}),(s==null?void 0:s.product_variation)&&e.jsx("p",{className:"text-red-600 pt-2",children:s==null?void 0:s.product_variation})]})]})})}),e.jsxs("div",{className:"panel",children:[e.jsxs("div",{className:"items-center mb-7",children:[e.jsx("label",{children:"Select Coupon Variation Price"}),e.jsxs("select",{className:"form-select text-white-dark",...a("coupon_variation_price"),onChange:n,children:[e.jsx("option",{value:"1",children:"Discount"}),e.jsx("option",{value:"2",children:"Parcentage"})]}),(s==null?void 0:s.product_variation)&&e.jsx("p",{className:"text-red-600 pt-2",children:s==null?void 0:s.product_variation})]}),t===!0?e.jsx(e.Fragment,{children:e.jsx("div",{className:"mb-5 space-y-5 relative",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("label",{children:["Parcentage",e.jsx("span",{className:"text-red-600 ",children:"*"})]}),e.jsx("input",{type:"text",className:"form-input",placeholder:"Set Parcentage"})]})})})}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"mb-5 space-y-5 relative",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:e.jsxs("div",{className:"md:col-span-2",children:[e.jsxs("label",{children:["Discount",e.jsx("span",{className:"text-red-600 ",children:"*"})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("input",{...a("single_product_price",{required:"Product Name Is required"}),type:"number",className:"form-input",placeholder:"Set Discount"})})]})})})})]})]}),e.jsx("button",{type:"submit",className:"btn btn-primary border border-solid border-[#FF6243] bg-[#FF6243] !mt-6",children:"Submit"})]})})]})})]})}h.layout=t=>e.jsx(p,{children:t,title:"Luminous-Ecommerce || Coupon Add"});export{h as default};