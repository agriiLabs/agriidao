import React from 'react'

const Leaderboard = () => {
  return (
   <>
        <div className="header header-fixed header-logo-center">
            <a href="#" className="header-title">Rewards Leaderboard</a>
            <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
            <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
        </div>

        <div className="page-content header-clear-medium">
                <div className="content mb-2 ">
                    <table className="table table-borderless text-center  rounded-sm shadow-l" style={{ overflow: 'hidden', backgroundColor: '#fff' }}>
                        <thead>
                            <tr className="bg-blue-dark">
                                <th scope="col" className="color-white">Rank</th>
                                <th scope="col" className="color-white">Member </th>
                                <th scope="col" className="color-white">Points</th>
                                {/* <th scope="col" className="color-white">Submissions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {% for position in leaderboard %} */}
                            <tr>
                                <th scope="row">#{{forloop.counter}}</th>
                                <td align="left" width ="65%">{% if position.user.profile_pic %}
                                    {% thumbnail position.user.profile_pic "25x25" crop="center" as im %}
                                    <img className="rounded-xl mr-3" src="{{ im.url }}" data-src="{{im.ur}}" width="{{ im.width }}" height="{{ im.height }}">
                                    {% endthumbnail %}
                                    {% else %}
                                    <img src="{% static 'app/images/default-user-profile.png' %}" width="25" className="rounded-circle mt- shadow-xl preload-img">
                                    {% endif %} 
                                    {{position.user.user}}
                                </td>
                                <td>{{position.total_vnt|floatformat:0|intcomma}} VNT</td>
                                {/* <td>{{position.total}}</td> */}
                            </tr>
                            {% empty %}
                            {% endfor %}
                        </tbody>
                    </table>
                </div>

        </div>
   </>
  )
}

export default Leaderboard