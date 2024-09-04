import Drawer from "@/components/drawer";

function CategoryBtnList(){
  return(
    <section className="mt-2 flex flex-row gap-2 overflow-x-auto scrollbar-hide">
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-primary text-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
      <button className="btn px-10 bg-white">button</button>
    </section>
  )
}

function CategorySec(){
  return(
    <section className="grid grid-cols-4 gap-4 mt-4">
      
      <div className="cursor-pointer bg-white rounded-md p-4">
        <div className="bg-gray-300 w-full h-40 rounded"></div>
        <h2 className="font-bold my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p className="text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi similique dolor temporibus.</p>
        <h2 className="font-bold text-primary my-2">Rp. 100.000</h2>
      </div>
      
      <div className="cursor-pointer bg-white rounded-md p-4">
        <div className="bg-gray-300 w-full h-40 rounded"></div>
        <h2 className="font-bold my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p className="text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi similique dolor temporibus.</p>
        <h2 className="font-bold text-primary my-2">Rp. 100.000</h2>
      </div>
      
      <div className="border-primary border-2 bg-white rounded-md p-4">
        <div className="bg-gray-300 w-full h-40 rounded"></div>
        <h2 className="font-bold my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p className="text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi similique dolor temporibus.</p>
        <h2 className="font-bold text-primary my-2">Rp. 100.000</h2>
      </div>
      
      <div className="cursor-pointer bg-white rounded-md p-4">
        <div className="bg-gray-300 w-full h-40 rounded"></div>
        <h2 className="font-bold my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p className="text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi similique dolor temporibus.</p>
        <h2 className="font-bold text-primary my-2">Rp. 100.000</h2>
      </div>
      
      <div className="cursor-pointer bg-white rounded-md p-4">
        <div className="bg-gray-300 w-full h-40 rounded"></div>
        <h2 className="font-bold my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <p className="text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi similique dolor temporibus.</p>
        <h2 className="font-bold text-primary my-2">Rp. 100.000</h2>
      </div>
      
    </section>
  )
}

export default function Home() {
  return (
    <section className="w-full min-h-screen flex bg-gray-100">

      <div className="w-3/4 p-4">
        <div className="flex">
          <Drawer />
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </div>
        
        <CategoryBtnList />
        <CategorySec />
      </div>

      <div className="w-1/4 bg-white">

      </div>
    </section>
  );
}
