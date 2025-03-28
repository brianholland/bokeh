#-----------------------------------------------------------------------------
# Copyright (c) Anaconda, Inc., and Bokeh Contributors.
# All rights reserved.
#
# The full license is in the file LICENSE.txt, distributed with this software.
#-----------------------------------------------------------------------------

#-----------------------------------------------------------------------------
# Boilerplate
#-----------------------------------------------------------------------------
from __future__ import annotations # isort:skip

import pytest ; pytest

#-----------------------------------------------------------------------------
# Imports
#-----------------------------------------------------------------------------

# Standard library imports
import json

# External imports
import bs4

# Module under test
import bokeh.embed.server as bes # isort:skip

#-----------------------------------------------------------------------------
# Setup
#-----------------------------------------------------------------------------

@pytest.fixture
def test_plot() -> None:
    from bokeh.plotting import figure
    test_plot = figure()
    test_plot.scatter([1, 2], [2, 3])
    return test_plot

#-----------------------------------------------------------------------------
# General API
#-----------------------------------------------------------------------------


class TestServerDocument:
    def test_invalid_resources_param(self) -> None:
        with pytest.raises(ValueError):
            bes.server_document(url="http://localhost:8081/foo/bar/sliders", resources=123)
        with pytest.raises(ValueError):
            bes.server_document(url="http://localhost:8081/foo/bar/sliders", resources="whatever")

    def test_headers_with_credentials_mutual_exclusivity(self):
        with pytest.raises(ValueError):
            bes.server_document(url="http://localhost:8081/foo/bar/sliders", headers={"foo": "bar"}, with_credentials=True)

    def test_resources_default_is_implicit(self) -> None:
        r = bes.server_document(url="http://localhost:8081/foo/bar/sliders", resources="default")
        assert 'resources=' not in r

    def test_resources_none(self) -> None:
        r = bes.server_document(url="http://localhost:8081/foo/bar/sliders", resources=None)
        assert 'resources=none' in r

    def test_general(self) -> None:
        url = "http://localhost:8081/foo/bar/sliders"
        r = bes.server_document(url=url)
        assert 'bokeh-app-path=/foo/bar/sliders' in r
        assert 'bokeh-absolute-url=http://localhost:8081/foo/bar/sliders' in r
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-app-path=/foo/bar/sliders&bokeh-absolute-url={url}\", true);"
        assert request in script.string

    def test_script_attrs_arguments_provided(self) -> None:
        url = "http://localhost:5006"
        r = bes.server_document(arguments=dict(foo=10))
        assert 'foo=10' in r
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-absolute-url={url}&foo=10\", true);"
        assert request in script.string

    def test_script_attrs_url_provided_absolute_resources(self) -> None:
        url = "http://localhost:8081/foo/bar/sliders"
        r = bes.server_document(url=url)
        assert 'bokeh-app-path=/foo/bar/sliders' in r
        assert 'bokeh-absolute-url=http://localhost:8081/foo/bar/sliders' in r
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-app-path=/foo/bar/sliders&bokeh-absolute-url={url}\", true);"
        assert request in script.string

    def test_script_attrs_url_provided(self) -> None:
        url = "http://localhost:8081/foo/bar/sliders"
        r = bes.server_document(url=url, relative_urls=True)
        assert 'bokeh-app-path=/foo/bar/sliders' in r
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-app-path=/foo/bar/sliders\", true);"
        assert request in script.string

    @pytest.mark.parametrize("with_credentials", [True, False])
    def test_with_credentials(self, with_credentials):
        script = bes.server_document("http://localhost:8081/foo/bar/sliders", with_credentials=with_credentials)
        assert f"xhr.withCredentials = {json.dumps(with_credentials)};" in script


class TestServerSession:
    def test_headers_with_credentials_mutual_exclusivity(self):
        with pytest.raises(ValueError):
            bes.server_document(url="http://localhost:8081/foo/bar/sliders", headers={"foo": "bar"}, with_credentials=True)

    def test_return_type(self, test_plot) -> None:
        r = bes.server_session(test_plot, session_id='fakesession')
        assert isinstance(r, str)

    def test_script_attrs_session_id_provided(self, test_plot) -> None:
        url = "http://localhost:5006"
        r = bes.server_session(test_plot, session_id='fakesession')
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-absolute-url={url}\", true);"
        assert request in script.string
        assert 'xhr.setRequestHeader("Bokeh-Session-Id", "fakesession")' in script.string

    def test_invalid_resources_param(self, test_plot) -> None:
        with pytest.raises(ValueError):
            bes.server_session(test_plot, session_id='fakesession', resources=123)
        with pytest.raises(ValueError):
            bes.server_session(test_plot, session_id='fakesession', resources="whatever")

    def test_resources_default_is_implicit(self, test_plot) -> None:
        r = bes.server_session(test_plot, session_id='fakesession', resources="default")
        assert 'resources=' not in r

    def test_resources_none(self, test_plot) -> None:
        r = bes.server_session(test_plot, session_id='fakesession', resources=None)
        assert 'resources=none' in r

    def test_model_none(self) -> None:
        url = "http://localhost:5006"
        r = bes.server_session(None, session_id='fakesession')
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-absolute-url={url}"
        assert request in script.string
        assert 'xhr.setRequestHeader("Bokeh-Session-Id", "fakesession")' in script.string

    def test_general(self, test_plot) -> None:
        url = "http://localhost:5006"
        r = bes.server_session(test_plot, session_id='fakesession')
        html = bs4.BeautifulSoup(r, "html.parser")
        scripts = html.find_all(name='script')
        assert len(scripts) == 1
        script = scripts[0]
        attrs = script.attrs
        assert list(attrs) == ['id']
        divid = attrs['id']
        request = f"xhr.open('GET', \"{url}/autoload.js?bokeh-autoload-element={divid}&bokeh-absolute-url={url}\", true);"
        assert request in script.string
        assert 'xhr.setRequestHeader("Bokeh-Session-Id", "fakesession")' in script.string

    @pytest.mark.parametrize("with_credentials", [True, False])
    def test_with_credentials(self, with_credentials):
        script = bes.server_document("http://localhost:8081/foo/bar/sliders",
                                     with_credentials=with_credentials)
        assert f"xhr.withCredentials = {json.dumps(with_credentials)};" in script

#-----------------------------------------------------------------------------
# Dev API
#-----------------------------------------------------------------------------

#-----------------------------------------------------------------------------
# Private API
#-----------------------------------------------------------------------------


class Test__clean_url:
    def test_default(self) -> None:
        assert bes._clean_url("default") == bes.DEFAULT_SERVER_HTTP_URL.rstrip("/")

    def test_bad_ws(self) -> None:
        with pytest.raises(ValueError):
            bes._clean_url("ws://foo")

    def test_arg(self) -> None:
        assert bes._clean_url("http://foo/bar") == "http://foo/bar"
        assert bes._clean_url("http://foo/bar/") == "http://foo/bar"


class Test__get_app_path:
    def test_arg(self) -> None:
        assert bes._get_app_path("foo") == "/foo"
        assert bes._get_app_path("http://foo") == "/"
        assert bes._get_app_path("http://foo/bar") == "/bar"
        assert bes._get_app_path("https://foo") == "/"
        assert bes._get_app_path("https://foo/bar") == "/bar"


class Test__process_arguments:
    def test_None(self) -> None:
        assert bes._process_arguments(None) == ""

    def test_args(self) -> None:
        args = dict(foo=10, bar="baz")
        r = bes._process_arguments(args)
        # order unspecified
        assert r == "&foo=10&bar=baz" or r == "&bar=baz&foo=10"

    def test_args_ignores_bokeh_prefixed(self) -> None:
        args = dict(foo=10, bar="baz")
        args["bokeh-junk"] = 20
        r = bes._process_arguments(args)
        # order unspecified
        assert r == "&foo=10&bar=baz" or r == "&bar=baz&foo=10"


class Test__process_app_path:
    def test_root(self) -> None:
        assert bes._process_app_path("/") == ""

    def test_arg(self) -> None:
        assert bes._process_app_path("/stuff") == "&bokeh-app-path=/stuff"


class Test__process_relative_urls:
    def test_True(self) -> None:
        assert bes._process_relative_urls(True, "") == ""
        assert bes._process_relative_urls(True, "/stuff") == ""

    def test_Flase(self) -> None:
        assert bes._process_relative_urls(False, "/stuff") == "&bokeh-absolute-url=/stuff"


class Test__process_resources:
    def test_bad_input(self) -> None:
        with pytest.raises(ValueError):
            bes._process_resources("foo")

    def test_None(self) -> None:
        assert bes._process_resources(None) == "&resources=none"

    def test_default(self) -> None:
        assert bes._process_resources("default") == ""

def Test__src_path(object):

    def test_args(self) -> None:
        assert bes._src_path("http://foo", "1234") =="http://foo/autoload.js?bokeh-autoload-element=1234"

#-----------------------------------------------------------------------------
# Code
#-----------------------------------------------------------------------------
