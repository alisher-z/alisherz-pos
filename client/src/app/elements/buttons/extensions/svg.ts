import { afterEveryRender, Directive, inject, Renderer2 } from "@angular/core";
import { ElExposer } from "../../extensions/element-exposer";

@Directive({
    selector: '[svg-viewbox]'
})
export class ViewBoxSVG extends ElExposer<SVGAElement> {
    renderer = inject(Renderer2);
    constructor() {
        super();
        afterEveryRender(this.setViewBox);
    }

    private setViewBox = () => {
        this.renderer.setAttribute(this.native, 'viewBox', this.getViewBox());
        this.renderer.setAttribute(this.native, 'xmlns', 'http://www.w3.org/2000/svg');
    }

    private get path() {
        return this.native.firstElementChild as SVGPathElement;
    }

    private getViewBox() {
        const { x, y, width, height } = this.path.getBBox();

        // if (x === 0 && y === 0 && width === 0 && height === 0)
        //     return '172 -628 616 296'

        return `${x} ${y} ${width} ${height}`;
    }
}