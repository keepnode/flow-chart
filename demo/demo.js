Chart.ready(function() {
    const basicX = 150;
    const startY = 20;
    const endY = 350;
    const newX = 50;
    const newY = 50;
    //请求数据的地址
    const dataUrl='http://192.168.1.228:5656/Components/WorkflowDesigner/WFDesignerHandler.ashx';
    //是否是模拟数据
    const isMock=true;
    var _current = null; // 当前选择节点id

    var _showNodeInfo = function(data) {
        if (!data) {
            return;
        }

        var infoPanel = $('.right');
        infoPanel.find('#inputTitle').val(data.name || ''); //结点名称
        infoPanel.find('#inputRemark').text(data.description || ''); //结点备注
        infoPanel.find("#ddlOperate").val(data.operate||''); //结点操作
        infoPanel.find("#inputLimit").val(data.limittime||'0'); //限制时间
        infoPanel.find("#inputCreator").val(data.creatorid||''); //创建人
        infoPanel.find("#inputCreateTime").val(data.createtime|| ''); // 创建时间
        // flag 标志(1表示起点，2表示终点，默认为0)
    };

    var _hideNodeInfo = function() {
        _showNodeInfo({
            name: '',
            description: '',
            operate: '',
            limittime: '',
            creatorid: '',
            createtime: '',
            flag:0
        });
    };

    var _createChart = function() {
        return new Chart($('#demo-chart'), {
            onNodeClick (data) { // 点击节点时触发
                _showNodeInfo(data);
                _current = data.nodeId;
            },
            onNodeDel (data) {
                console.log(data);
                _hideNodeInfo();
            }
        })
    };

    var chart = _createChart();

    //添加开始节点
    var nodeStart = chart.addNode('起点', basicX, startY, {
        class: 'node-start',
        removable: false,
        data: {
            name: '起点',
            flag: 1,
            limittime:-1
        }
    });
    nodeStart.addPort({
        isSource: true
    });

    //添加结束节点
    var nodeEnd = chart.addNode('终点', basicX, endY, {
        class: 'node-end',
        removable: false,
        data: {
            name: '终点',
            flag: 2,
            limittime:-1
        }
    });
    nodeEnd.addPort({
        isTarget: true,
        position: 'Top'
    });
    //获取模板信息
    const getTemplateInfo=function(id){
      if(isMock){
        const jsonData = {
          "id":1,
          "name": "2016年度市安全生产科技项目(安监局）",
          "description": "2016年度市安全生产科技项目(安监局）",
          "creatorid": "235061",
          "createtime": "2017-12-20 14:50:18",
          "cdeptid": "",
          "nodes": [
            {
              "id": "68410",
              "name": "起点",
              "description": "",
              "operate": "",
              "limittime": -1,
              "x": 12,
              "y": 187,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:50:18",
              "condition": "",
              "flag": 1,
              "childs": [
                {
                  "childid": "68412",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68411",
              "name": "终点",
              "description": "",
              "operate": "",
              "limittime": -1,
              "x": 700,
              "y": 187,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:50:18",
              "condition": "N68418",
              "flag": 2,
              "childs": null
            },
            {
              "id": "68412",
              "name": "申报",
              "description": "申报",
              "operate": "申报",
              "limittime": 0,
              "x": 12,
              "y": 105,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:51:03",
              "condition": "N68410",
              "flag": 0,
              "childs": [
                {
                  "childid": "68415",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68413",
              "name": "市安监局受理",
              "description": "市安监局受理",
              "operate": "受理",
              "limittime": 0,
              "x": 150,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:56:10",
              "condition": "N68415",
              "flag": 0,
              "childs": [
                {
                  "childid": "68414",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68414",
              "name": "市安监局审核",
              "description": "市安监局审核",
              "operate": "审核",
              "limittime": 0,
              "x": 281,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:56:35",
              "condition": "N68413",
              "flag": 0,
              "childs": [
                {
                  "childid": "68416",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68415",
              "name": "区安监局初审",
              "description": "区安监局初审",
              "operate": "初审",
              "limittime": 0,
              "x": 12,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:00:01",
              "condition": "N68412",
              "flag": 0,
              "childs": [
                {
                  "childid": "68413",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68416",
              "name": "局领导审核",
              "description": "局领导审核",
              "operate": "审核",
              "limittime": 0,
              "x": 404,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:03",
              "condition": "N68414",
              "flag": 0,
              "childs": [
                {
                  "childid": "68417",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68417",
              "name": "公示",
              "description": "公示",
              "operate": "公示",
              "limittime": 0,
              "x": 538,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:20",
              "condition": "N68416",
              "flag": 0,
              "childs": [
                {
                  "childid": "68418",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68418",
              "name": "上传政府批文",
              "description": "上传政府批文",
              "operate": "立项/办结",
              "limittime": 0,
              "x": 700,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:35",
              "condition": "N68417",
              "flag": 0,
              "childs": [
                {
                  "childid": "68411",
                  "childcondition": ""
                }
              ]
            }
          ]
        };
        return jsonData;
      }
        $.ajax({
          type:'get',
          url:dataUrl,
          async:false,
          data:{
            getwftemplateid:id
          },
          success:function (data) {
            return JSON.parse(data);
          }
        });
    };
    const addNewTask = function(name, params) {
        params = params || {};
        params.data = params.data || {};
        params.class = 'node-process';
        params.data.flag = 0; // 流程节点类型
        var node = chart.addNode(name, newX, newY, params);
        node.addPort({
            isSource: true
        });
        node.addPort({
            isTarget: true,
            position: 'Top'
        });
    };

    const bindEvent = function() {
         $(".flowchart-panel").on('click', '.btn-add', function(event) {
            var target = $(event.target);
            var node = target.data('node');
            addNewTask(node.name, {
                data: node
            });
        });

         $(".btn-save").on("click",function () {
           $('#jsonOutput').val(JSON.stringify(chart.toJson()));
         });

         $(".btn-load").on("click",function () {
             if ($('#demo-chart').length === 0) {
               $('<div id="demo-chart"></div>').appendTo($('.middle'));
               chart = _createChart();
             }
             chart.fromJson($('#jsonOutput').val());
         });

         $(".btn-clear").on("click",function () {
           $('#demo-chart').remove();
           chart.clear();
         });

        // $(".btn-del").click(() => {
        //     if (!_current) {
        //         return;
        //     }

        //     chart.removeNode(_current);
        // });
    };

    bindEvent();

    // 使用测试数据
    var listHtml = '';

    TEST_NODES.forEach(function (node) {
        listHtml+="<li><span class='node-name'>"+node.name+"</span><a class='btn-add' data-id='node.procId' href='javascript:void(0)'>添加</a></li>";
    })
    $('.nodes').html(listHtml).find('.btn-add').each(function(index) {
        $(this).data('node', $.extend({}, TEST_NODES[index]));
    });
});
