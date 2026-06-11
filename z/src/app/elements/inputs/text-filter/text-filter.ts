import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, input, model } from "@angular/core";
import { v4 } from "uuid";
import { IconButton } from "../../buttons/icon-button/icon-button";

@Component({
	selector: "text-filter",
	imports: [IconButton, NgTemplateOutlet],
	templateUrl: "./text-filter.html",
	styleUrl: "./text-filter.scss",
	host: { "[style.--columns]": "columns()" },
})
export class TextFilter {
	readonly label = input<string>();
	readonly value = model<String[]>([]);
	readonly columns = computed(() => this.value().length);

	readonly id = v4();

	keydown(e: KeyboardEvent) {
		const { key, target } = e;
		if (key === 'Backspace' && !(<HTMLInputElement>target).value)
			this.remove();
	}

	onTab(e: Event) {
		if ((<any>e.target).value)
			e.preventDefault();

		this.add(<any>e.target);
	}

	onEnter(e: Event) {
		if ((<any>e.target).value)
			e.preventDefault();

		this.add(<any>e.target);
	}

	blur(e: FocusEvent) {
		if ((<any>e.target).value)
			this.add(<any>e.target);
	}

	tapdown(index: number, e: MouseEvent) {
		e.preventDefault();
		this.remove(index);
	}

	private add(input: HTMLInputElement) {
		if (!input.value) return;

		this.value.update((params) => {
			const newParams = [...new Set([...params, input.value])];

			return JSON.stringify(newParams) === JSON.stringify(params)
				? params
				: newParams;
		});

		input.scrollIntoView({ behavior: "instant", block: "start" });
		this.emptyInput(input);
	}

	private remove(index: number = -1) {
		this.value.update(params => {
			index < 0
				? params.pop()
				: params.splice(index, 1);

			return [...params];
		});
	}

	private emptyInput(input: HTMLInputElement) {
		input.value = "";
	}
}
