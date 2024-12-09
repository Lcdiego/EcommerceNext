'use client'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { ProductoContext } from "../contex/contex";
import { useContext } from "react";


const Footer = () => {

  const{dark}= useContext(ProductoContext)

    return (
        <div className={''}>
            <div className="w-full flex justify-center pt-10 ">
                <div className=" w-[54rem] flex justify-around  ">
                    <Link className={''} href="#">About</Link>
                    <Link className={''} href="#">Blog</Link>
                    <Link className={''} href="#">Jobs</Link>
                    <Link className={''} href="#">Press</Link>
                </div>

            </div>
            <div className="flex justify-center ">
                <div className=" flex w-[36rem] justify-around my-10 ">
                    <FaFacebook size={20} className={''} />
                    <FaInstagramSquare size={20} className={''} />
                    <RiCloseLargeLine size={20} className={''} />
                    <FaGithub size={20} className={''} />
                    <FaYoutube size={20} className={''} />
                </div>

            </div>
            <div className="flex justify-center">
                <p className=" mb-6">
                    @2024 La compania,derechos reservados
                </p>
            </div>




        </div>
    )
}

export default Footer 