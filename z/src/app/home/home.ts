import { Component } from '@angular/core';
import { TreeView } from '../elements/tree-view/tree-view';
import { TreeViewType } from '../utils/types';

@Component({
  selector: 'home',
  imports: [TreeView],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tree: TreeViewType[] = [
    {
      label: 'Solar System',
      field: 'solar-system',
      children: [
        {
          label: 'Terrestrial Planets',
          field: 'terrestrial',
          children: [
            { label: 'Mercury', field: 'mercury' },
            { label: 'Venus', field: 'venus' },
            { label: 'Earth', field: 'earth' },
            { label: 'Mars', field: 'mars' },
          ],
        },
        {
          label: 'Gas Giants',
          field: 'gas-giants',
          children: [
            {
              label: 'Jupiter',
              field: 'jupiter',
              children: [
                { label: 'Io', field: 'io' },
                { label: 'Europa', field: 'europa' },
                { label: 'Ganymede', field: 'ganymede' },
                { label: 'Callisto', field: 'callisto' },
              ],
            },
            {
              label: 'Saturn',
              field: 'saturn',
              children: [
                { label: 'Titan', field: 'titan' },
                { label: 'Enceladus', field: 'enceladus' },
              ],
            },
          ],
        },
        {
          label: 'Ice Giants',
          field: 'ice-giants',
          children: [
            {
              label: 'Uranus',
              field: 'uranus',
              children: [
                {
                  label: 'Inner Moons',
                  field: 'uranus-inner',
                  children: [
                    { label: 'Cordelia', field: 'cordelia' },
                    { label: 'Ophelia', field: 'ophelia' },
                    {
                      label: 'Deep Research Data',
                      field: 'uranus-deep-data',
                      children: [
                        { label: 'Atmospheric Composition', field: 'atmos-comp' },
                        { label: 'Magnetic Field Readings', field: 'mag-field' },
                      ],
                    },
                  ],
                },
                { label: 'Miranda', field: 'miranda' },
              ],
            },
            { label: 'Neptune', field: 'neptune' },
          ],
        },
      ],
    },
    {
      label: 'Deep Space Objects',
      field: 'deep-space',
      children: [
        { label: 'Andromeda Galaxy', field: 'andromeda' },
        { label: 'Orion Nebula', field: 'orion' },
      ],
    },
    { label: 'Voyager 1 (Static Probe)', field: 'voyager-1' },
    { label: 'Hubble Telescope', field: 'hubble' },
  ];
}
