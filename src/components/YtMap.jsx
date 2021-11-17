import { Amap } from '@amap/amap-vue';
import { Config } from './Map';
import styles from './Map.module.less';

import { CENTER, ZOOM } from '@/constants';

export default {
  name: 'YtMap',

  methods: {
    setZoom(zoom) {
      this.$refs.Config.setZoom(zoom);
    },

    setFeatures(features) {
      this.$refs.Config.setFeatures(features);
    }
  },

  render() {
    const { zoom = ZOOM, ...mapProps } = this.$attrs;

    return (
      <Amap
        ref="aMap"
        center={CENTER}
        zoom={zoom}
        class={styles.map}
        attrs={{...mapProps}}
        onClick={this.$emit.bind(this, 'mapClick')}
      >
        <Config ref="Config" />
        {this.$slots.default}
      </Amap>
    );
  }
};
