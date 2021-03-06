import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-dom-focus-component">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
		</style>
		<div>
			<div>
				<a id="shadow1" href="javascript:void(0);" tabindex="0">Shadow 1</a>
			</div>
			<slot></slot>
			<div>
				<a id="shadow2" class="d2l-focusable" href="javascript:void(0);" tabindex="0">Shadow 2</a>
			</div>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-dom-focus-component',
	getShadow1: function() { return this.$.shadow1; },
	getShadow2: function() { return this.$.shadow2; }
});
