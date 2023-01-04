import { HTMLAttributes } from "react";

const AudioIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            xmlSpace="preserve"
            {...props}
        >
            <image
                width={28}
                height={28}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAbFBMVEUAAAD/lwD/mQD/mQD/ lwD/mAD/lwD/mAD/lwD/mQD/mQD/mQD/mAD/mAD/lgD/mAD/vmD/uFD/////8t//+O//5b//2J// nxD/pSD/0o//zH//y4D/7M//68//0pD/zID/v2D/nhD/5r//skBUEDRBAAAAD3RSTlMAQI/P779g 3yBf71CQz1ACrB9QAAAAAWJLR0QSe7xsAAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YE Ew84AKcm90gAAADVSURBVCjPfZNZFoMgDEVBQJzaKNZWq533v8fiBAnVvi8418QkvDC2ikdCAkgV cRYq1uCkY4ISAUQ68SyVECjLV5bDhtIlp9yC2ZwZlQKlVTUfxVQn/t5Y1cs5DgIJ1LZ38idzqutm vXBWUHhGl4KpfXhgch9mDPYhYHhpQ+jTdraLIK17j6tpegqVb2WwzbdBK24I9W2EdwS5H9/DdNVg np5pNPjX2861R4GTWVxJn7IFGrj32HKxUbwFnYmOP7ESuTPRlImEOPePqad1KNS4DqLw6/AFGAgk 8BzC/D0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTI6NTY6MDArMDM6MDAC1kDbAAAA JXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDEyOjU2OjAwKzAzOjAwc4v4ZwAAAABJRU5ErkJg gg=="
            />
        </svg>
    );
};

export default AudioIcon;
