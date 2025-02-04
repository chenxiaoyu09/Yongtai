import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { StreetsPolygon } from '@/components/Map';
import { ParagraphModal, Float } from '@/components/Custom';

import { fetchElectricList, fetchElectricDetail } from '@/api';
import _ from 'lodash';

import markerElectric from '@/assets/MapPlugin/marker-electric.png';

export default {
  name: 'WaterElectric',

  data() {
    return {
      area: undefined,
      state: {
        infoVisible: false,
        infoWindowContent: undefined
      }
    };
  },

  async mounted() {
    this.area = await fetchElectricList();
  },

  methods: {
    onMarkerClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description },
        infoVisible: true
      });
    },

    onMapClick() {
      _.assign(this.state, {
        infoWindowContent: undefined,
        infoVisible: false
      });
    },

    onInfoWindowClick() {
      this.$refs.modal?.open(
        fetchElectricDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerElectric}
          onClick={this.onMarkerClick.bind(
            null,
            id,
            title,
            position,
            area,
            description
          )}
        />
      ));
    },

    renderText() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Text
          position={position}
          text={title}
          offset={[-10, 20]}
          domStyle={{
            color: '#FB3F62',
            fontWeight: 'bolder',
            fontSize: '15px'
          }}
          onClick={this.onMarkerClick.bind(
            null,
            id,
            title,
            position,
            area,
            description
          )}
        />
      ));
    }
  },

  render() {
    return (
      <div>
        <StreetsPolygon />
        {this.renderProjects()}
        {this.renderText()}

        <InfoWindow
          visible={this.state.visible}
          position={this.state.infoWindowContent?.position}
          isCustom
          autoMove
        >
          <div
            class="info-window"
            style={{ visibility: this.state.infoVisible ? '' : 'hidden' }}
            onClick={this.onInfoWindowClick}
          >
            {this.state.infoWindowContent?.title}
          </div>
        </InfoWindow>

        <Float bottom="100px" onClick={() => this.$refs.modal?.open()} />

        <ParagraphModal ref="modal">
          <h2>水域水流</h2>
          <pre>Water Flow</pre>
          <p>
            永泰县共有水电站113座，其中：中型水电站1座（界竹口水电站），装机容量6万千瓦，小型水电站112座，总装机容量达16.46万千瓦。
          </p>
        </ParagraphModal>
      </div>
    );
  }
};
