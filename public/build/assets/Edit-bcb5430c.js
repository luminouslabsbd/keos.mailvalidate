import{r as j,j as e,d as u,y as v}from"./app-c5b2fbc5.js";import N from"./Mainlayout-df64b153.js";import{S as f}from"./react-select.esm-c4f37c68.js";import{R as b}from"./quill.snow-12f04981.js";import{u as y,C}from"./index.esm-58ffd830.js";import"./ThemeConfig-49c8c6b2.js";import"./Footer-aa869156.js";import"./Header-f4f996fd.js";import"./Dropdown-18d15c21.js";import"./nonIterableRest-5e64c36b.js";import"./Sidebar-c883cd57.js";import"./FlashMessage-5dd6c328.js";import"./sweetalert2.all-22908a15.js";import"./floating-ui.dom-0b485352.js";import"./emotion-react.browser.esm-99a0c51c.js";function w(){const{control:a,register:r,handleSubmit:d,setValue:i,reset:S,formState:{errors:t},watch:n}=y(),c=[{value:"Digital Service",label:"Digital Service"},{value:"Physical Service",label:"Physical Service"}],o=s=>{i("category",s==null?void 0:s.value)};n("blog_details","");const m=s=>{i("blog_details",s)},[l,x]=j.useState(!1),h=()=>{x(!l)};function p(s){v.post("/admin/blog-post/store",s)}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"panel flex items-center overflow-x-auto whitespace-nowrap p-3 ",children:[e.jsx("div",{className:"rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"h-3.5 w-3.5",children:[e.jsx("path",{d:"M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{opacity:"0.5",d:"M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),e.jsxs("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e.jsx("li",{children:e.jsx(u,{href:"#",className:"text-primary hover:underline",children:"Blog Post"})}),e.jsx("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e.jsx("span",{children:"Edit"})})]})]}),e.jsx("div",{className:"pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6",children:e.jsxs("div",{className:"panel",id:"forms_grid",children:[e.jsx("div",{className:"flex items-center justify-between mb-5",children:e.jsx("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Add New Post"})}),e.jsx("div",{className:"mb-5",children:e.jsxs("form",{className:"space-y-5",onSubmit:d(p),method:"post",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 ",children:[e.jsxs("div",{children:[e.jsxs("label",{children:["Category ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx(C,{control:a,name:"category",render:({field:s})=>e.jsx(f,{options:c,value:c.find(g=>g.value===s.value),onChange:o,placeholder:"Select Category"})})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" Title ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...r("title",{required:"Title Is required"}),type:"text",className:"form-input",placeholder:"Title"}),t.title&&e.jsx("p",{className:"text-red-600 pt-2",children:t.title.message})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" Tags ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...r("tag",{required:"Tag Is required"}),type:"text",className:"form-input"}),t.tag&&e.jsx("p",{className:"text-red-600 pt-2",children:t.tag.message})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" Image ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{type:"file",className:"form-input",...r("thumbnail")}),t.tag&&e.jsx("p",{className:"text-red-600 pt-2",children:t.tag.message})]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-1 gap-4 ",children:e.jsx("div",{children:e.jsx(b,{value:product_description,onChange:s=>m(s),theme:"snow"})})}),e.jsx("div",{children:e.jsx("div",{children:e.jsxs("label",{className:"inline-flex",children:[e.jsx("input",{...r("allow_Blog_SEO"),type:"checkbox",checked:l,className:"form-checkbox text-dark rounded-full",onChange:h}),e.jsx("span",{children:"   Allow Blog SEO"})]})})}),l&&e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-1 gap-4 ",children:[e.jsxs("div",{children:[e.jsxs("label",{children:[" Meta Keywords ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("input",{...r("meta_keywords"),type:"text",className:"form-input",placeholder:"pant,shirt,watch,glass"}),t.tag&&e.jsx("p",{className:"text-red-600 pt-2",children:t.tag.message})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" Image ",e.jsx("span",{className:"text-danger",children:"*"})," "]}),e.jsx("textarea",{...r("meta_description"),className:"form-input",placeholder:"Write SEO description"}),t.tag&&e.jsx("p",{className:"text-red-600 pt-2",children:t.tag.message})]})]}),e.jsx("button",{type:"submit",className:"btn btn-primary !mt-6",children:"Create Post"})]})})]})})]})}w.layout=a=>e.jsx(N,{children:a,title:"Luminous-Ecommerce || Edit"});export{w as default};
