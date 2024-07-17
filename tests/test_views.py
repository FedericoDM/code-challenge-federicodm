import pytest
from http import HTTPStatus

PARSE_API = "/api/parse/"

def test_api_parse_succeeds(client):
    """
    Tests the API by sending an address
    """
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    correct_answer = {
        "AddressNumber": "123",
        "StreetName": "main",
        "StreetNamePostType": "st",
        "PlaceName": "chicago",
        "StateName": "il"

    }

    correct_address_type = "Street Address"

    payload = {
        "address": address_string
    }

    response = client.get(PARSE_API, payload)
    address_type = response.json()["address_type"]
    components = response.json()["address_components"]

    assert response.status == HTTPStatus.OK
    assert address_type == correct_address_type
    assert components == correct_answer


    pytest.fail()


def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    pytest.fail()
