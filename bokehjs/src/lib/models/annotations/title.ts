import {TextAnnotation, TextAnnotationView} from "./text_annotation"
import {VerticalAlign, TextAlign} from "core/enums"
import type {Size, Layoutable} from "core/layout"
import type * as p from "core/properties"
import type {XY, SXY} from "core/util/bbox"
import type {Position} from "core/graphics"
import * as resolve from "../common/resolve"

export class TitleView extends TextAnnotationView {
  declare model: Title
  declare visuals: Title.Visuals
  declare layout: Layoutable

  protected _get_position(): Position {
    const hmargin = this.model.offset
    const vmargin = this.model.standoff/2

    const {align, vertical_align} = this.model

    let sx: number, sy: number
    const {bbox} = this.layout

    switch (this.panel!.side) {
      case "above":
      case "below": {
        switch (vertical_align) {
          case "top":    sy = bbox.top     + vmargin; break
          case "middle": sy = bbox.vcenter;           break
          case "bottom": sy = bbox.bottom  - vmargin; break
        }

        switch (align) {
          case "left":   sx = bbox.left    + hmargin; break
          case "center": sx = bbox.hcenter;           break
          case "right":  sx = bbox.right   - hmargin; break
        }
        break
      }
      case "left": {
        switch (vertical_align) {
          case "top":    sx = bbox.left    + vmargin; break
          case "middle": sx = bbox.hcenter;           break
          case "bottom": sx = bbox.right   - vmargin; break
        }

        switch (align) {
          case "left":   sy = bbox.bottom  - hmargin; break
          case "center": sy = bbox.vcenter;           break
          case "right":  sy = bbox.top     + hmargin; break
        }
        break
      }
      case "right": {
        switch (vertical_align) {
          case "top":    sx = bbox.right   - vmargin; break
          case "middle": sx = bbox.hcenter;           break
          case "bottom": sx = bbox.left    + vmargin; break
        }

        switch (align) {
          case "left":   sy = bbox.top     + hmargin; break
          case "center": sy = bbox.vcenter;           break
          case "right":  sy = bbox.bottom  - hmargin; break
        }
        break
      }
    }

    return {sx, sy}
  }

  get anchor(): XY<number> {
    const {align, vertical_align} = this.model
    return resolve.text_anchor("auto", align, vertical_align)
  }

  get origin(): SXY {
    return this._get_position()
  }

  get angle(): number {
    return this.panel!.get_label_angle_heuristic("parallel")
  }

  protected override _get_size(): Size {
    const offset = (value: number) => {
      // XXX: The magic 2px is for backwards compatibility. This will be removed at
      // some point, but currently there is no point breaking half of visual tests.
      return value == 0 ? 0 : 2 + value + this.model.standoff
    }
    const {width, height} = super._get_size()
    if (this.panel!.is_horizontal) {
      return {width, height: offset(height)}
    } else {
      return {width: offset(width), height}
    }
  }
}

export namespace Title {
  export type Attrs = p.AttrsOf<Props>

  export type Props = TextAnnotation.Props & {
    vertical_align: p.Property<VerticalAlign>
    align: p.Property<TextAlign>
    offset: p.Property<number>
    standoff: p.Property<number>
  }

  export type Visuals = TextAnnotation.Visuals
}

export interface Title extends Title.Attrs {}

export class Title extends TextAnnotation {
  declare properties: Title.Props
  declare __view_type__: TitleView

  constructor(attrs?: Partial<Title.Attrs>) {
    super(attrs)
  }

  static {
    this.prototype.default_view = TitleView

    this.define<Title.Props>(({Float}) => ({
      vertical_align: [ VerticalAlign, "bottom" ],
      align:          [ TextAlign, "left" ],
      offset:         [ Float, 0 ],
      standoff:       [ Float, 10 ],
    }))

    this.override<Title.Props>({
      text_font_size: "13px",
      text_font_style: "bold",
      text_line_height: 1.0,
    })
  }
}
