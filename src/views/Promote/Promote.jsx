import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, Float } from '@/components/Custom';
import SignList from '../Project/SignList';
import CreateMeeting from '../Project/CreateMeeting';

import { fetchPromoteList, fetchPromoteDetail } from '@/api';
import _ from 'lodash';

import markerRace from '@/assets/MapPlugin/marker-race.png';
import bg1 from '@/assets/Bg/promote-1.png';
import bg2 from '@/assets/Bg/promote-2.png';
import bg3 from '@/assets/Bg/promote-3.png';
import bg4 from '@/assets/Bg/promote-4.png';
import iconCalendar from '@/assets/Icon/icon-calendar.png';
import iconCamera from '@/assets/Icon/icon-camera.png';
import IconBack from '@/assets/Icon/icon-back.png';

const VIDEO_URL =
  'https://zhengxinyun.oss-cn-guangzhou.aliyuncs.com/xiangcun/other/xuanchuanpian.mp4';

export default {
  name: 'Promote',

  data() {
    return {
      area: undefined,
      state: {
        infoVisible: false,
        infoWindowContent: undefined,
        activeProject: undefined,
        step: 0
      }
    };
  },

  async mounted() {
    this.area = await fetchPromoteList();
  },

  methods: {
    onMarkerClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description },
        infoVisible: true
      });
    },

    onMarkerNextClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description }
      });

      this.onInfoWindowClick();
    },

    onMapClick() {
      _.assign(this.state, {
        infoWindowContent: undefined,
        infoVisible: false
      });
    },

    onInfoWindowClick() {
      this.setStep(1);

      this.$refs.modal?.open(
        fetchPromoteDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.state.activeProject = this.state.infoWindowContent;

      this.onMapClick();
    },

    setStep(step) {
      this.state.step = step;
    },

    setContacts(contacts) {
      _.assign(this.state.activeProject, { contacts });
    },

    onClose() {
      setTimeout(() => {
        this.setStep(0);
      }, 500);
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerRace}
          onClick={this.onMarkerNextClick.bind(
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
          offset={[-14, 16]}
          domStyle={{
            color: '#FB3F62',
            fontWeight: 'bolder',
            fontSize: '14px'
          }}
          onClick={this.onMarkerNextClick.bind(
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
    const { activeProject, step } = this.state;

    return (
      <div>
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
            <h3>{this.state.infoWindowContent?.title}</h3>
            <p>{this.state.infoWindowContent?.description}</p>
            {this.state.infoWindowContent?.area}
          </div>
        </InfoWindow>
        <Float
          bottom="200px"
          type="media"
          onClick={() => window.open(VIDEO_URL)}
        >
          <i class="el-icon-video-play" style={{ fontSize: '32px' }}></i>
        </Float>
        <Float bottom="100px" onClick={() => this.$refs.modal?.open()} />

        <ParagraphModal
          ref="modal"
          onClose={this.onClose}
          onMounted={this.setContacts}
        >
          {step === 0 && (
            <div style={{ height: '540px', overflow: 'auto' }}>
              <h2>乡村振兴</h2>
              <div>
                <img src={bg1} />
                <img src={bg2} />
                <img src={bg3} />
                <img src={bg4} />
              </div>
              <p>
                乡村振兴近5年和今年工作情况及今后5年和明年工作思路
                县委乡村振兴办 2021年11月 一、过去五年和今年主要工作和成就
                （一）过去五年主要工作及成就
                一是强化产业振兴。扛稳粮食安全责任，扎实推进耕地抛荒治理工作。推进“两园一强镇”建设，建成大洋镇百香果产业园和同安镇茶叶产业园，推进嵩口国家农业产业强镇建设。成立全省扶贫农产品统购统销中心、全市首家农村产权流转服务中心。同安茶产业集聚区、梧桐-嵩口农业休闲产业集聚带和葛岭-城峰李梅加工业集聚区初步呈现。梧桐-嵩口、同安-大洋等乡村旅游线路不断优化，初步形成嵩口镇、梧桐镇、岭路乡、葛岭镇四大民宿聚集群。获评国家农业绿色发展先行区、全国休闲农业和乡村旅游示范县、全国休闲农业重点县。
                二是强化人才振兴。成立国内首家县级乡村振兴研究院；引进在全国乡建领域具备影响力的北京绿十字团队参与试点村创建；率先开展“一懂两爱”村务工作者试点，选聘两批次116名；打造“百硕入樟”人才品牌，开展紧缺人才招聘；加强本土人才培育，依托县城建校培养建筑工程、古建筑修缮等专业方向技术人才；全面落实“第一书记”“科技特派员”等制度。
                三是强化生态振兴。农村人居环境整治成效作为全省唯一受国务院通报嘉奖，近三年，新建提升美丽乡村263个，打造精品示范村12个。以农村环卫社会化服务、日本净化槽等技术革新试点解决垃圾、污水等重难点问题，并逐步向全县推广。开展农村人居环境整治文明积分制、垃圾分类等试点工作。
                四是强化文化振兴。成立乡村复兴基金会，扎实开展历史文化遗产保护传承工作，国家级和省级传统村落数量均位于全省第一，庄寨建筑群入选第八批全国重点文物保护单位，爱荆庄荣获联合国亚太地区文化遗产保护优秀奖。举办农民丰收节、耕读文化艺术节等文化节庆活动。成立民宿勘查审验工作领导小组，实现民宿管理制度、审批制度、服务体系的“三大突破”。嵩口镇、月洲村分别荣获全国文明乡镇、文明村，永泰入围全国文明城市提名城市。
                五是强化组织振兴。2018年1月，永泰即成立乡村振兴办，同扶贫办合署办公，率先实现队伍衔接，现有集中办公人员28名。在全市率先建成30个中心村党委，成立福州市首个乡村振兴联合党支部。扎实推进4个省级、市级特色乡镇、42个试点村建设，打造大樟溪沿线乡村振兴示范带及同安庄寨耕读文化示范带。嵩口镇月洲村、梧桐镇坵演村为市级乡村振兴高级版村，富泉乡力星村等14个村为市级乡村振兴中级版村。
                六是巩固脱贫攻坚成果。以养蜂、百香果、食用菌和乡村旅游4大扶贫产业为抓手，持续提供保洁员、护林员、光伏专岗等公益性岗位，不断提升脱贫人口“造血功能”；实行教育、医疗、住房、饮水保障动态跟踪，织密社会保障网络，实现脱贫人口1259户4094人（2020年底人口自然增减后数据）稳定脱贫，人均纯收入从3133元提高至2万元以上。
                （二）今年主要工作和成就
                2021年持续推进乡村振兴试点示范项目建设，着力打造大樟溪沿线乡村振兴示范带，成功申报全国美丽乡村建设重点县，争取中央财政资金1亿元；获评“2021年全国休闲农业重点县”、“2021茶旅融合特色县域”，县扶贫办荣获“全国脱贫攻坚先进集体”荣誉称号。
                （一）打造乡村振兴试点示范。实施乡村振兴市级重点项目16项，预计完成年度投资6.64亿元；实施19个省级试点村、2个省级实绩突出村、2个市级试点乡镇和7个市级试点村的试点示范项目209个，预计完成投资1.56亿元，财政专项资金投入9422.83万元。成立乡村振兴示范带建设项目指挥部，重点推进梧桐-嵩口大樟溪沿线乡村振兴示范带建设，统筹推进同安庄寨耕读文化示范带建设。梧桐镇坵演村获评市级乡村振兴高级版试点村，盖洋乡盖洋村等8个村获评市级乡村振兴中级版试点村。
                （二）促进乡村产业发展。一是抓稳抓牢粮食生产。落实粮食生产指导性计划25.9万亩，实施优质粮食工程，建立省级优质稻新品种核心展示示范片10个1800亩，带动辐射面积10.5万亩，水稻优质率达85%。完成3389.881亩抛荒地复耕复种任务。二是做大做强农业产业。推进“两园一强镇”建设。实施李梅产业振兴工程，建立4个李梅新品种新技术示范基地，试运营首个由台商投资建设的主题观光工厂梅百华文化创意园。推广稻田养鱼等稻田综合种养示范面积约1047亩。三是深化推进全域旅游。创新“旅游+”工作，大力扶持菜篮公传说非遗扶贫就业工坊，打造3条非遗主题旅游路线。发挥国家首批全域旅游示范区品牌效应，全方位宣传推广“永泰自然来”等文旅品牌。嵩口古镇被评为全国乡村旅游重点镇，梧桐镇坵演村、大洋镇大展村（溪墘村）被评为福州市乡村旅游精品示范点。新增7家备案民宿，福州城投(永泰)乡村棕旅房车营地正式对外营业。四是不断强化产业支撑。在全市率先完成首批“一懂两爱”村务工作者续聘工作，完善“1+4”跟踪培养制度。进一步巩固“百硕入樟”人才品牌建设，面向全国招聘事业编制硕士研究生30名。开展第二届50名“永阳英才”选拔工作。
                （三）凸显生态保护效益。印发实施《永泰县村庄规划编制（2021-2023）三年行动工作方案》，2021年需完成规划总数100个，开展6个乡镇国土空间总体规划编制工作。提升农村人居环境，全县农村传统旱厕已全部拆除或去功能化，完成对2013年以来财政奖补的27011口户厕的现场走访摸排。开展嵩口、梧桐、赤锡、塘前4个乡镇18个村的生活污水治理项目。在7个乡镇28个行政村开展文明积分制试点工作，累计评选出一星级文明户1012户次，发放文明积分券10120分，考评出“美丽庭院”90分以上且前二十名”农户911户次，发放文明积分券9110分。
                （四）推进文明文化传承。成立新时代文明实践所、站、基地300个，实现全覆盖。组织开展新一届（2021—2023年度）各级文明村镇申报工作。推进新时代公民道德建设，举办道德讲堂、文化讲坛85场，开展移风易俗宣传“五进”活动230余场次。实施同安镇三捷村、梧桐镇椿阳村历史文化名村、传统村落重点改善提升行动。启动永阳古城新安巷申报省级第五批历史文化街区。
                （五）完善乡村治理体系。一是抓好村级组织换届选举工作。完成村级组织换届工作，新一届班子年龄、学历实现“一降一升”，队伍结构更加合理优化。选派新一批省、市、县驻村第一书记88名。255个村集体年经营性收入稳定在10万元以上，20万以上村达50%以上，50万元以上的村占比达10%以上，100万元以上的村有新突破。二是提升基层治理水平。新建南门社区法治文化主题公园、嵩口镇民法典公园、东星村智慧信息法治文化广场等法治文化阵地，进一步推进基层民主法治建设。开展各类法治宣传活动170余场次，法治信息共被中央级媒体采用15篇，省级媒体采用2篇，市级媒体采用39篇。三是提升乡村治安防控水平。加强打伞破网力度，2021年查处涉黑涉恶腐败和“保护伞”问题11人；加大“打财断血”的力度，今年新增执行到位罚金7.1万元人民币。深化推进“综治中心+网格化+雪亮工程”一体化、实战化建设，全面开展“智慧看家·平安乡村”视频监控系统创新亮点项目，织密农村地区的治安防控网络，
                （七）致力实现生活富裕。一是巩固扶贫开发成效。坚持“四个不摘”，保持过渡期总体帮扶政策稳定，已下达到户资金283万元，免费提供百香果苗1465株，继续引导脱贫户发展特色种养殖产业，稳定公益性岗位228名。落实教育补助、雨露计划等教育帮扶政策。建档立卡脱贫户家庭医生签约率达100%，县财政出资139.9万元继续为脱贫人口提供健康扶贫保险。结合入户走访对脱贫人口住房及饮水情况进行动态跟踪监测，发现问题立即帮助解决。健全完善防止返贫动态监测和帮扶机制，有2户农户纳入突发严重户，核查“一键报贫”申报对象96户，无符合条件人员。二是健全公共服务体系。改善办学条件，修缮23所中小学，新改扩建城南幼儿园、樟城幼儿园、城峰中心小学、永泰一中旗山校区。与福建医大附一医院建成医疗健康联合体，成立专家工作站，组建总医院专家顾问团，提升县级医疗服务能力。在嵩口镇建设1所农村区域性养老服务中心；依托现有养老服务设施谋划建设8处老年人助餐点，解决老年人就餐难题。
                二、今后五年和明年工作思路 （一）今后五年思路
                以省市试点示范项目、美丽乡村建设重点县项目为抓手，全力打造大樟溪沿线乡村振兴示范带、同安庄寨耕读文化示范带，构建“串点连线成片”格局。巩固拓展扶贫开发成果，推动乡村产业振兴，提升乡村建设和治理水平，促进乡村宜居宜业、农民富裕富足。
                1.推动乡村产业再提档。严格落实粮食安全保障和粮食安全省长责任制，确保年播种面积保持在24.5万亩以上、总产量达9.1万吨以上。继续抓强以闽台农业融合发展产业园、现代农业产业园等为主的园区建设，扶持壮大产业龙头。推动传统李梅产业转型升级，实施李梅产业振兴工程，新建一批新品种新技术示范种植基地。重点支持建设数字农业示范基地和农业物联网应用示范点，到2025年，初步形成“示范基地+农业物联网应用+新型经营主体”的农业物联网应用技术推广新模式。
                2.加快文旅产业大融合。整合县域资源要素，着力构建“一核一带五区”的全域旅游空间布局。打造永泰文化旅游“生态高地”，构建生态旅游发展的动态可持续模式。举办旅游节庆活动，策划具有永泰特色的演艺剧目和体验式消费项目。开发休闲农业和乡村旅游精品线路，继续培育一批旅游精品村、金牌旅游村。抓好乡土特产品控，开发“永泰家乡好物”系列伴手礼，创建永泰美食品牌。
                3.打造生态宜居新样板。积极创建国家森林城市、国家森林村镇，建设国家级森林康养示范基地，申报创建全市首个“两山”理念实践创新基地。打好蓝天、碧水、净土升级战，打造现代环境治理体系样板县。创新实施河（湖）长制，建立完善全域智慧监测体系。接续推进农村人居环境整治提升五年行动，全面推行文明积分制。推进乡村建设行动，落实村庄规划编制三年行动，抓好智慧乡村建设，完善农村水、电气、通信、物流等基础设施，规范农村宅基地审批和建房管理，保障农房质量。
                4.实现民生福祉更进步。落实5年过渡期和“四个不摘”要求，健全防止返贫动态监测帮扶机制，巩固拓展扶贫开发成果。突出教育优先，实施教育强县“九大工程”，全面落实“县管校聘”，推行集团化办学、合作办学、九年一贯制办学等。深化公立医院改革，全面推动村卫生所规范化提升，增强基层医疗卫生机构服务能力。积极应对人口老龄化，落实国家优化生育政策，深化居家社区养老服务集成改革。完善城乡养老、失业、工伤、医疗等保险基本制度和社会救助制度，兜牢群众基本生活保障底线。
                5.推进乡村治理强提升。实施“领头雁”计划，壮大科技特派员、“一懂两爱”村务工作者等人才队伍，实施本土人才培养、乡土人才回归工程，建强乡村振兴一线力量。巩固政法队伍教育整顿成果，推动扫黑除恶常态化。强化乡镇、村居综治中心建设和网格化服务管理。继续推进民主法治示范村（社区）建设，深化“一县（区）一特色品牌”创建工作。
                （二）明年工作思路
                1.推进示范项目建设。围绕五个振兴和“二十字”总要求，完成19个省级试点村、3个省级实绩突出村、同安市级试点乡镇和9个市级试点村项目。完成美丽乡村建设重点县项目，大樟溪沿线乡村振兴示范带初显成效，串联同安庄寨耕读文化示范带，打造示范片区。
                2.推动产业提档升级。认真落实粮食安全保障和粮食安全省长责任制，继续推动闽台农业融合发展产业园建设工作；督促嵩口镇加快农业产业强镇扶持项目建设；做好省级现代农业（蛋鸭、李梅）产业园、同安镇市级现代茶叶产业园和丹云乡市级现代畜禽产业园等产业发展平台申报和后期跟踪工作。用好“国家休闲农业重点县”金字招牌，促进乡村产业融合发展。
                3.加快文旅产业发展。推动文旅重点项目建设，实施红色旅游基础设施建设，推动2A、3A级景区申报。多维度营销“永泰自然来”旅游品牌，串联推出古镇、庄寨、温泉、生态、乡村旅游等精品线路。支持鼓励各乡镇发展特色民宿，积极打造乡村民宿集群。
                4.巩固生态宜居成果。接续推进农村人居环境整治提升五年行动，全面推行文明积分制。巩固山水林田湖草水环境综合整治项目成果，完善乡镇污水管网建设。做好现代化农房建设、建筑风貌管控。对全县1682.4公里的道路开展全方位的养护。重点打造3条精品美丽乡村路。
                5.完善民生保障网络。健全防止返贫动态监测帮扶机制，建立农村低收入人口常态化帮扶机制，确保脱贫户不返贫，抓好边缘困难群众帮扶。抓好公共卫生机构防控能力建设、县乡村一体化构建、医疗人才队伍建设、学科能力建设和县域医疗信息化建设，全面提升县域医疗救治和健康服务能力。深化居家社区养老服务集成改革，加快三级三类养老服务设施建设。
                6.提升乡村治理能力。实施“领头雁”计划，用好用活省市县选派驻村第一书记。加强校（院）企（地）合作，用好盘活本地人才存量和樟籍在外人才资源，积极探索“党建+人才专员”模式。加快推广“平安景区（庄寨）”等平安建设经验，持续开展“平安村（社区）”、“民主法治村（社区）”创建活动。全面推广“智慧看家·平安乡村”社会治理项目，力争年内实现覆盖80%以上村（社区）。
              </p>
            </div>
          )}
          <div slot="title">
            {step > 1 ? (
              <div
                style={{
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={this.setStep.bind(null, Math.floor(step - 1))}
              >
                <img src={IconBack} height="14" />
              </div>
            ) : (
              <div>
                <img
                  src={iconCalendar}
                  height="50"
                  onClick={this.setStep.bind(null, 2)}
                />
                <img
                  src={iconCamera}
                  height="50"
                  onClick={this.setStep.bind(null, 2.1)}
                />
              </div>
            )}
          </div>

          {step === 2 || step === 3 ? (
            <SignList
              id={activeProject?.id}
              step={step - 1}
              signType="village"
              onChangeStep={this.setStep.bind(null, step + 1)}
            />
          ) : null}
          {step === 2.1 ? (
            <CreateMeeting
              id={activeProject?.id}
              name={activeProject?.title}
              contacts={activeProject?.contacts}
            />
          ) : null}
        </ParagraphModal>
      </div>
    );
  }
};
