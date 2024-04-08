import React, {FC, PropsWithChildren} from 'react';
import Head from "next/head";
import {IMeta} from "@/components/UI/meta/meta.interface";
import {usePathname} from "next/navigation";
import {onlyText, siteName, titleMerge} from "@/components/UI/meta/meta.config";


const Meta:FC<PropsWithChildren<IMeta>>
    = (
    {
        title,
        description,
        image = '/images/logo.png',
        children,
        type = 'website'
    }
) => {
    const path = usePathname()
    const url = `${process.env.APP_URL}${path}`
    return (
       <>
              <Head>
                  <title itemProp={'headline'}>{titleMerge(title)}</title>
                  {
                      description ? (
                            <>
                                <meta itemProp={'description'} name = {'description'} content={onlyText(description, 152)}/>
                                <link rel='canonical' href = {url}/>
                                <meta property={'og:type'} content={type}/>
                                <meta property={'og:locale'} content='en'/>
                                <meta property={'og:title'} content={titleMerge(title)}/>
                                <meta property={'og:url'} content={url}/>
                                <meta property={'og:image'} content={image}/>
                                <meta property={'og:site_name'} content={siteName}/>
                                <meta property={'og:description'} content={onlyText(description, 197)}/>
                           </>
                        ) : (
                            <meta name = {'robots'} content={'noindex, nofollow'}/>
                      )}
                    {children}
                </Head>
       </>
    );
}

export default Meta;